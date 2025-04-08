const db = require('../config/database');

const User = {
    create: (email, password) => {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                [email, password],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    },
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
                if (err) reject(err);
                resolve(user);
            });
        });
    },
};

module.exports = User;