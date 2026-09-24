const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const insertData = () => {
  db.serialize(() => {
    // Inventory
    const moreInventory = [
      { sku: 'OF-CH-09', name: 'Herman Miller Aeron (Used)', category: 'Furniture', stock: 2, reorderLevel: 5, predictedDemand: 2, supplier: 'OfficeResell', status: 'Critical' },
      { sku: 'TECH-MO-11', name: 'Logitech MX Master 3S', category: 'Accessories', stock: 18, reorderLevel: 15, predictedDemand: 10, supplier: 'TechCorp', status: 'Healthy' },
      { sku: 'MISC-01', name: 'Whiteboard Markers (Pack of 12)', category: 'Office Supplies', stock: 4, reorderLevel: 10, predictedDemand: 8, supplier: 'Staples', status: 'Critical' },
      { sku: 'TECH-CA-05', name: 'USB-C to HDMI Adapter', category: 'Accessories', stock: 25, reorderLevel: 10, predictedDemand: 5, supplier: 'CablesInc', status: 'Healthy' },
      { sku: 'OF-DE-02', name: 'IKEA Bekant Desk - White', category: 'Furniture', stock: 11, reorderLevel: 15, predictedDemand: 4, supplier: 'IKEA B2B', status: 'Low Stock' },
      { sku: 'TECH-LP-08', name: 'ThinkPad T14 Gen 3', category: 'Electronics', stock: 7, reorderLevel: 5, predictedDemand: 6, supplier: 'Lenovo Direct', status: 'Healthy' },
      { sku: 'MISC-05', name: 'A4 Printer Paper (Box of 5)', category: 'Office Supplies', stock: 1, reorderLevel: 5, predictedDemand: 10, supplier: 'Staples', status: 'Critical' },
      { sku: 'TECH-MN-01', name: 'Dell UltraSharp 27" 4K', category: 'Electronics', stock: 14, reorderLevel: 10, predictedDemand: 12, supplier: 'TechCorp', status: 'Healthy' },
      { sku: 'BR-CF-01', name: 'Breakroom Coffee Beans (Espresso)', category: 'Pantry', stock: 3, reorderLevel: 8, predictedDemand: 15, supplier: 'Local Roasters', status: 'Critical' },
      { sku: 'TECH-AC-09', name: 'Anker Power Strip (6 Outlets)', category: 'Accessories', stock: 32, reorderLevel: 20, predictedDemand: 5, supplier: 'TechCorp', status: 'Healthy' }
    ];
    
    const stmtInv = db.prepare("INSERT INTO inventory (sku, name, category, stock, reorderLevel, predictedDemand, supplier, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    moreInventory.forEach(item => {
      stmtInv.run(item.sku, item.name, item.category, item.stock, item.reorderLevel, item.predictedDemand, item.supplier, item.status);
    });
    stmtInv.finalize();

    console.log("Database seeded with more human-like inventory data!");
  });
};

insertData();
