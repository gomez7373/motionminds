const express = require('express');
const { getFeedbackByDate } = require('../controllers/feedback.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const router = express.Router();


// get feedback data for the current date
router.get('/api/feedback/today', isAuthenticated, getFeedbackByDate);

module.exports = router;