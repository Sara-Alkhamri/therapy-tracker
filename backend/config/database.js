// backend/config/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./therapy.db');

// Create users table if it doesn't exist
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
});

module.exports = db;