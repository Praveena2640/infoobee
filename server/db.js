const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
  db.serialize(() => {
    // Inventory Table
    db.run(`CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      stock INTEGER DEFAULT 0,
      reorderLevel INTEGER DEFAULT 0,
      predictedDemand INTEGER DEFAULT 0,
      supplier TEXT,
      status TEXT
    )`);

    // Sales Table
    db.run(`CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      date TEXT,
      amount REAL,
      items INTEGER,
      status TEXT
    )`);

    // Purchase Requests Table
    db.run(`CREATE TABLE IF NOT EXISTS purchase_requests (
      id TEXT PRIMARY KEY,
      product TEXT,
      quantity INTEGER,
      total REAL,
      requester TEXT,
      status TEXT
    )`);

    // Notifications Table
    db.run(`CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      type TEXT,
      message TEXT,
      time TEXT
    )`);

    // Tasks Table
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      assignee TEXT,
      status TEXT,
      dueDate TEXT
    )`);

    // Seed Data if empty
    db.get("SELECT COUNT(*) AS count FROM inventory", (err, row) => {
      if (row.count === 0) {
        console.log("Database initialized (Empty).");
      }
    });
  });
};

initDb();

module.exports = db;
