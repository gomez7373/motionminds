const express = require('express');
const { startDuration, addSession, getSessionsByUserId} = require('../controllers/session.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const router = express.Router();

// start a timer for session duration
router.get('/api/session', isAuthenticated, startDuration);

// add a new session for a specific user
router.post('/api/session', isAuthenticated, addSession);

// get session data for a specific user
router.get('/api/session', isAuthenticated, getSessionsByUserId);

module.exports = router;