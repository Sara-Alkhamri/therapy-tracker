// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const register = async (req, res) => {
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
};

module.exports = { register };