const express = require('express');
const { getDaily, getDailyByDate, createDaily, updateDaily, deleteDaily } = require('../controllers/daily.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { handleValidationErrors } = require('../middleware/validator.middleware.js');
const { validateDateParam, validateDailyEntry } = require('../validators/daily.validator');
const router = express.Router();


// get all daily entries
router.get('/api/daily', isAuthenticated, getDaily);

// Route to get daily entries by date
router.get('/api/daily/:date', isAuthenticated, validateDateParam, handleValidationErrors, getDailyByDate);

// create a new daily entry
router.post('/api/daily', isAuthenticated, validateDailyEntry, handleValidationErrors, createDaily);

// update a daily entry
router.put('/api/daily/:id', isAuthenticated, validateDailyEntry, handleValidationErrors, updateDaily);

// delete a daily entry
// router.delete('/api/daily/:id', isAuthenticated, deleteDaily);

module.exports = router;