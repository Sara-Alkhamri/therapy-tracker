const sqlite3 = require('sqlite3').verbose();

// Use environment variable for database path
const dbPath = process.env.DB_PATH || './therapy.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Schema initialization
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add other tables here...
});

module.exports = db;