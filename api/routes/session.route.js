const express = require('express');
const { addSession, getSessionsByUserId, getSessionById, getSession } = require('../controllers/session.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { validateSessionData } = require('../validators/session.validator');
const {handleValidationErrors} = require('../middleware/validator.middleware.js');
const router = express.Router();


// add a new session for a specific user
router.post('/api/session', isAuthenticated, validateSessionData, handleValidationErrors, addSession);

// get session data for today's date
router.get('/api/session', isAuthenticated, getSession);

// get session data for a specific user
router.get('/api/sessions', isAuthenticated, getSessionsByUserId);

// get session data by id
router.get('/api/session/:id', isAuthenticated, getSessionById);

module.exports = router;