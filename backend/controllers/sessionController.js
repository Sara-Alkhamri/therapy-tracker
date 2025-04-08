const Session = require('../models/Session');

const logSession = async (req, res) => {
    const { date, therapist, notes, mood } = req.body;
    try {
        await Session.create(req.user.id, date, therapist, notes, mood);
        res.status(201).send('Session logged');
    } catch (err) {
        res.status(500).send('Error logging session');
    }
};

const getSessions = async (req, res) => {
    try {
        const sessions = await Session.findByUserId(req.user.id);
        res.json(sessions);
    } catch (err) {
        res.status(500).send('Error fetching sessions');
    }
};

module.exports = { logSession, getSessions };