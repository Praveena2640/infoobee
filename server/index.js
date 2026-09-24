require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Configure Nodemailer with real SMTP or Ethereal (Mock SMTP) fallback
let transporter;

if (process.env.SMTP_HOST && process.env.SMTP_USER && (process.env.SMTP_PASS || process.env.SMTP_PASSWORD)) {
  // Use REAL SMTP if environment variables are provided
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD
    }
  });
  console.log('Nodemailer configured with REAL SMTP server.');
} else {
  // Fallback to Mock Ethereal for testing
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return;
    }
    transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    console.log('Nodemailer configured with Mock Ethereal Mail. (Provide SMTP_HOST in .env for real emails)');
  });
}

const sendAlertEmails = (itemName, currentStock) => {
  if (!transporter) return;
  
  const isRealSMTP = process.env.SMTP_HOST ? true : false;
  const defaultManager = isRealSMTP ? process.env.SMTP_USER : 'manager@bizsync.local';
  
  // Grab both emails from the .env file (or use defaults)
  const managerEmail = process.env.MANAGER_EMAIL || defaultManager;
  const vendorEmail = process.env.VENDOR_EMAIL || 'vendor@bizsync.local';
  
  // Combine them with a comma so nodemailer sends to BOTH
  const toAddresses = `${managerEmail}, ${vendorEmail}`;

  const mailOptions = {
    from: '"BizSync System" <admin@bizsync.local>',
    to: toAddresses,
    subject: `SYSTEM ALERT: Low Stock for ${itemName}`,
    text: `Hello,\n\nThis is an automated system alert. The stock for ${itemName} has fallen to a critical level (${currentStock} remaining).\n\nManager: Please review the inventory and approve a purchase request.\nVendor: Please prepare for a potential incoming restock order.\n\nThank you,\nBizSync Automated System`
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Alert Emails sent to Manager & Vendor! Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  });
};

// Helper functions for automated workflow logic
const checkInventoryAndNotify = () => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return;
    
    let changed = false;
    let newNotifications = [];

    rows.forEach(item => {
      let newStatus = item.status;
      
      if (item.stock <= item.reorderLevel && item.stock >= item.reorderLevel / 2 && item.status === 'Healthy') {
        newStatus = 'Low Stock';
        newNotifications.push({
          id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: 'warning',
          message: `${item.name} stock fell below reorder level.`,
          time: 'Just now'
        });
      } else if (item.stock < 10 && item.status !== 'Critical') {
        newStatus = 'Critical';
        newNotifications.push({
          id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: 'critical',
          message: `${item.name} is critically low (<10)! Manager email dispatched.`,
          time: 'Just now'
        });
        
        // Trigger automated email to BOTH manager and vendor
        sendAlertEmails(item.name, item.stock);
        
      } else if (item.stock < item.reorderLevel / 2 && item.status !== 'Critical' && item.stock >= 10) {
        newStatus = 'Critical';
        newNotifications.push({
          id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: 'critical',
          message: `${item.name} is critically low!`,
          time: 'Just now'
        });
      }

      if (newStatus !== item.status) {
        db.run('UPDATE inventory SET status = ? WHERE id = ?', [newStatus, item.id]);
        changed = true;
      }
    });

    if (newNotifications.length > 0) {
      const stmt = db.prepare("INSERT INTO notifications (id, type, message, time) VALUES (?, ?, ?, ?)");
      newNotifications.forEach(notif => {
        stmt.run(notif.id, notif.type, notif.message, notif.time);
        io.emit('new-notification', notif);
      });
      stmt.finalize();
    }

    if (changed) {
      io.emit('inventory-updated');
    }
  });
};


// --- API ENDPOINTS ---

// Inventory
app.get('/api/inventory', (req, res) => {
  db.all('SELECT * FROM inventory ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/inventory', (req, res) => {
  const { name, sku, category, stock, reorderLevel, supplier } = req.body;
  const status = stock > reorderLevel ? 'Healthy' : 'Low Stock';
  const predictedDemand = Math.floor(stock / 2);
  
  db.run(
    'INSERT INTO inventory (name, sku, category, stock, reorderLevel, predictedDemand, supplier, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, sku, category, stock, reorderLevel, predictedDemand, supplier, status],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const notif = {
        id: `NOTIF-${Date.now()}`,
        type: 'success',
        message: `New product ${name} added successfully.`,
        time: 'Just now'
      };
      
      db.run('INSERT INTO notifications (id, type, message, time) VALUES (?, ?, ?, ?)', [notif.id, notif.type, notif.message, notif.time]);
      
      io.emit('inventory-updated');
      io.emit('new-notification', notif);
      
      res.status(201).json({ id: this.lastID, name, sku, category, stock, reorderLevel, predictedDemand, supplier, status });
    }
  );
});

// Sales
app.get('/api/sales', (req, res) => {
  db.all('SELECT * FROM sales ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/sales', (req, res) => {
  const { productName, quantity, amount } = req.body;
  
  // 1. Get next order ID
  db.get('SELECT COUNT(*) AS count FROM sales', (err, row) => {
    const saleId = `ORD-00${row.count + 1}`;
    const date = new Date().toISOString().split('T')[0];
    
    // 2. Add sale
    db.run('INSERT INTO sales (id, date, amount, items, status) VALUES (?, ?, ?, ?, ?)', 
      [saleId, date, amount, quantity, 'Completed'], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // 3. Update inventory
        db.run('UPDATE inventory SET stock = MAX(0, stock - ?) WHERE name = ?', [quantity, productName], function(err) {
           io.emit('new-sale');
           io.emit('inventory-updated');
           checkInventoryAndNotify();
           res.status(201).json({ id: saleId, date, amount, items: quantity, status: 'Completed' });
        });
      }
    );
  });
});

// Purchase Requests
app.get('/api/purchase-requests', (req, res) => {
  db.all('SELECT * FROM purchase_requests ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.put('/api/purchase-requests/:id/approve', (req, res) => {
  const { id } = req.params;
  
  db.run('UPDATE purchase_requests SET status = ? WHERE id = ?', ['Approved', id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type: 'success',
      message: `Purchase Request ${id} was approved.`,
      time: 'Just now'
    };
    db.run('INSERT INTO notifications (id, type, message, time) VALUES (?, ?, ?, ?)', [notif.id, notif.type, notif.message, notif.time]);
    
    io.emit('purchase-requests-updated');
    io.emit('new-notification', notif);
    
    res.json({ success: true });
  });
});

// AI Insights & Forecast (Linear Regression)
app.get('/api/forecast', (req, res) => {
  db.all('SELECT date, SUM(amount) as revenue, SUM(items) as total_items FROM sales GROUP BY date ORDER BY date ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (rows.length === 0) {
      return res.json([]); // No data to forecast
    }

    // Linear Regression implementation
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    let n = rows.length;

    // Convert dates to a sequence of days (0, 1, 2, ...) relative to the first date
    const firstDateMs = new Date(rows[0].date).getTime();
    
    const processedData = rows.map(row => {
      const daysSinceStart = Math.floor((new Date(row.date).getTime() - firstDateMs) / (1000 * 60 * 60 * 24));
      return { x: daysSinceStart, y: row.total_items, date: row.date };
    });

    processedData.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumXX += point.x * point.x;
    });

    // Calculate slope (m) and intercept (b)
    let m = 0;
    let b = 0;
    
    // Avoid division by zero if there's only 1 data point or all x are the same
    const denominator = (n * sumXX - sumX * sumX);
    if (denominator !== 0) {
       m = (n * sumXY - sumX * sumY) / denominator;
       b = (sumY - m * sumX) / n;
    } else if (n > 0) {
       b = sumY / n; // Flat line if we can't calculate slope
    }

    // Generate output data (historical + future 14 days)
    const forecastResults = [];
    
    // Historical points
    processedData.forEach(point => {
      forecastResults.push({
        date: point.date,
        actual: point.y,
        forecast: Math.max(0, Math.round(m * point.x + b))
      });
    });

    // Future points
    const lastPoint = processedData[processedData.length - 1];
    for (let i = 1; i <= 14; i++) {
      const futureX = lastPoint.x + i;
      const futureDate = new Date(firstDateMs + futureX * 24 * 60 * 60 * 1000);
      const formattedDate = futureDate.toISOString().split('T')[0];
      
      forecastResults.push({
        date: formattedDate,
        actual: null,
        forecast: Math.max(0, Math.round(m * futureX + b))
      });
    }

    res.json(forecastResults);
  });
});

app.get('/api/recommendations', (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const recommendations = [];
    
    rows.forEach(item => {
      if (item.stock <= item.reorderLevel) {
        recommendations.push({
          type: 'risk',
          title: 'Stock Risk Detected',
          message: `${item.name} is below reorder level. Current stock: ${item.stock}.`,
          item: item
        });
      } else if (item.predictedDemand > item.stock / 2) {
         recommendations.push({
          type: 'surge',
          title: 'Demand Surge Prediction',
          message: `${item.name} is showing high demand. Consider increasing reorder quantity.`,
          item: item
        });
      }
    });

    res.json(recommendations);
  });
});

// Notifications
app.get('/api/notifications', (req, res) => {
  db.all('SELECT * FROM notifications ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, assignee, dueDate } = req.body;
  
  db.run(
    'INSERT INTO tasks (title, description, assignee, status, dueDate) VALUES (?, ?, ?, ?, ?)',
    [title, description, assignee, 'Pending', dueDate],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const newTask = { id: this.lastID, title, description, assignee, status: 'Pending', dueDate };
      io.emit('new-task', newTask);
      res.status(201).json(newTask);
    }
  );
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run('UPDATE tasks SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    io.emit('task-updated');
    res.json({ success: true });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
