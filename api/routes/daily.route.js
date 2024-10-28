const express = require('express');
const { getDaily, getDailyByDate, createDaily, getDailyStats, updateDailyProgress } = require('../controllers/daily.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { handleValidationErrors } = require('../middleware/validator.middleware.js');
const { validateDateParam, validateDailyEntry } = require('../validators/daily.validator');
const router = express.Router();


// get all daily entries
router.get('/api/daily', isAuthenticated, getDaily);

// Route to get daily entries by date
router.get('/api/daily/:date', isAuthenticated, validateDateParam, handleValidationErrors, getDailyByDate);

// get daily stats
router.get('/api/daily/stats', isAuthenticated, getDailyStats);

// create a new daily entry
router.post('/api/daily', isAuthenticated, validateDailyEntry, handleValidationErrors, createDaily);

// update daily progress
router.put('/api/daily/:id', isAuthenticated, updateDailyProgress);

module.exports = router; 