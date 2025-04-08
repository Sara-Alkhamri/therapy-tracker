const db = require('../config/database');

const Goal = {
    create: (userId, description) => {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO goals (user_id, description) VALUES (?, ?)',
                [userId, description],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    },
    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM goals WHERE user_id = ?', [userId], (err, goals) => {
                if (err) reject(err);
                resolve(goals);
            });
        });
    },
};

module.exports = Goal;