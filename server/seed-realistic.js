const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const insertData = () => {
  db.serialize(() => {
    // Inventory
    const initialInventory = [
      { sku: 'BZS-001', name: 'MacBook Pro 16"', category: 'Electronics', stock: 15, reorderLevel: 20, predictedDemand: 8, supplier: 'TechCorp', status: 'Low Stock' },
      { sku: 'BZS-002', name: 'Dell XPS 13', category: 'Electronics', stock: 42, reorderLevel: 15, predictedDemand: 12, supplier: 'TechCorp', status: 'Healthy' },
      { sku: 'BZS-003', name: 'Ergonomic Chair', category: 'Furniture', stock: 5, reorderLevel: 10, predictedDemand: 15, supplier: 'OfficePlus', status: 'Critical' },
      { sku: 'BZS-004', name: 'Standing Desk', category: 'Furniture', stock: 28, reorderLevel: 10, predictedDemand: 5, supplier: 'OfficePlus', status: 'Healthy' },
      { sku: 'BZS-005', name: 'Mechanical Keyboard', category: 'Accessories', stock: 12, reorderLevel: 25, predictedDemand: 20, supplier: 'KeyKey', status: 'Reorder Recommended' },
    ];
    
    const stmtInv = db.prepare("INSERT INTO inventory (sku, name, category, stock, reorderLevel, predictedDemand, supplier, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    initialInventory.forEach(item => {
      stmtInv.run(item.sku, item.name, item.category, item.stock, item.reorderLevel, item.predictedDemand, item.supplier, item.status);
    });
    stmtInv.finalize();

    // Sales over the last 30 days
    const stmtSales = db.prepare("INSERT INTO sales (id, date, amount, items, status) VALUES (?, ?, ?, ?, ?)");
    
    let orderIdCounter = 100;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Random number of orders per day (1 to 5)
      const numOrders = Math.floor(Math.random() * 5) + 1;
      
      for (let j = 0; j < numOrders; j++) {
        // Base trend + random noise (slightly trending up over time)
        const baseAmount = 5000 + ((30 - i) * 500); // Upward trend
        const randomFluctuation = Math.floor(Math.random() * 20000) - 5000;
        let amount = baseAmount + randomFluctuation;
        if (amount < 2000) amount = 2000;
        
        const items = Math.floor(Math.random() * 5) + 1;
        const id = `ORD-${orderIdCounter++}`;
        
        stmtSales.run(id, dateString, amount, items, 'Completed');
      }
    }
    stmtSales.finalize();

    console.log("Database seeded with realistic historical data!");
  });
};

insertData();
