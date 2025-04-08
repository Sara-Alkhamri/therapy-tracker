const Goal = require('../models/Goal');

const setGoal = async (req, res) => {
    const { description } = req.body;
    try {
        await Goal.create(req.user.id, description);
        res.status(201).send('Goal set');
    } catch (err) {
        res.status(500).send('Error setting goal');
    }
};

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.findByUserId(req.user.id);
        res.json(goals);
    } catch (err) {
        res.status(500).send('Error fetching goals');
    }
};

module.exports = { setGoal, getGoals };