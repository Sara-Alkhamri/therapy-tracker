const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const register = async (req, res) => {
    const { name, email, password } = req.body; // Add name
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)', // Add name
            [email, hashedPassword, name],
            function (err) {
                if (err) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                const token = jwt.sign({ id: this.lastID, name }, 'secret_key', { expiresIn: '1h' });
                res.status(201).json({ token, user: { id: this.lastID, name, email } });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error finding user' });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { register, login }; // Make sure both are exported