const express = require('express');
const { setGoal, getGoals } = require('../controllers/goalController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
router.post('/', authenticate, setGoal);
router.get('/', authenticate, getGoals);

module.exports = router;