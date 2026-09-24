const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const requests = [
  { id: 'PR-1001', product: 'MacBook Pro 16"', quantity: 5, total: 12500, requester: 'Sarah Jenkins', status: 'Pending' },
  { id: 'PR-1002', product: 'Dell UltraSharp 27" 4K', quantity: 10, total: 4500, requester: 'Mike Ross', status: 'Approved' },
  { id: 'PR-1003', product: 'Logitech MX Master 3S', quantity: 20, total: 2000, requester: 'Emma Watson', status: 'Pending' },
  { id: 'PR-1004', product: 'Herman Miller Aeron (Used)', quantity: 15, total: 7500, requester: 'David Lee', status: 'Pending' },
  { id: 'PR-1005', product: 'IKEA Bekant Desk - White', quantity: 8, total: 1600, requester: 'Sarah Jenkins', status: 'Approved' },
  { id: 'PR-1006', product: 'Anker Power Strip (6 Outlets)', quantity: 50, total: 1250, requester: 'John Doe', status: 'Pending' }
];

db.serialize(() => {
  const stmt = db.prepare("INSERT OR REPLACE INTO purchase_requests (id, product, quantity, total, requester, status) VALUES (?, ?, ?, ?, ?, ?)");
  requests.forEach(req => {
    stmt.run(req.id, req.product, req.quantity, req.total, req.requester, req.status);
  });
  stmt.finalize();
  console.log("Purchase requests seeded!");
});
