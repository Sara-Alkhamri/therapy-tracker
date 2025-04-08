const db = require('../config/database');

const Session = {
    create: (userId, date, therapist, notes, mood) => {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO sessions (user_id, date, therapist, notes, mood) VALUES (?, ?, ?, ?, ?)',
                [userId, date, therapist, notes, mood],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    },
    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM sessions WHERE user_id = ?', [userId], (err, sessions) => {
                if (err) reject(err);
                resolve(sessions);
            });
        });
    },
};

module.exports = Session;