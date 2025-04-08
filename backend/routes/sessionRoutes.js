const express = require('express');
const { logSession, getSessions } = require('../controllers/sessionController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
router.post('/', authenticate, logSession);
router.get('/', authenticate, getSessions);

module.exports = router;