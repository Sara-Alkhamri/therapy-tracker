// backend/index.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/authenticate');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Parse JSON request bodies
app.use(express.json());

// Connect to SQLite database
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
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date TEXT,
        notes TEXT,
        mood INTEGER
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        description TEXT,
        completed BOOLEAN DEFAULT 0
      )
    `);
});

// Register route
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword],
            (err) => {
                if (err) {
                    return res.status(400).send('User already exists');
                }
                res.status(201).send('User registered');
            }
        );
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).send('Error finding user');
        }

        // If user doesn't exist
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

        // Send the token to the client
        res.json({ token });
    });
});

// Log a session
app.post('/sessions', authenticate, (req, res) => {
    const { date, notes, mood } = req.body;
    db.run(
        'INSERT INTO sessions (user_id, date, notes, mood) VALUES (?, ?, ?, ?)',
        [req.user.id, date, notes, mood],
        (err) => {
            if (err) return res.status(500).send('Error logging session');
            res.status(201).send('Session logged');
        }
    );
});

// Get all sessions for a user
app.get('/sessions', authenticate, (req, res) => {
    db.all(
        'SELECT * FROM sessions WHERE user_id = ?',
        [req.user.id],
        (err, sessions) => {
            if (err) return res.status(500).send('Error fetching sessions');
            res.json(sessions);
        }
    );
});

// Set a goal
app.post('/goals', authenticate, (req, res) => {
    const { description } = req.body;
    db.run(
        'INSERT INTO goals (user_id, description) VALUES (?, ?)',
        [req.user.id, description],
        (err) => {
            if (err) return res.status(500).send('Error setting goal');
            res.status(201).send('Goal set');
        }
    );
});

// Get all goals for a user
app.get('/goals', authenticate, (req, res) => {
    db.all(
        'SELECT * FROM goals WHERE user_id = ?',
        [req.user.id],
        (err, goals) => {
            if (err) return res.status(500).send('Error fetching goals');
            res.json(goals);
        }
    );
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));