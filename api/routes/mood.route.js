const express = require('express');
const moodController = require('../controllers/mood.controller.js');
const isAuthenticated = require('../middleware/auth.middleware.js');
const { validateMood } = require('../validators/mood.validator.js');

const router = express.Router();

// Create a new mood entry
router.post('/api/mood', isAuthenticated, validateMood, moodController.createMood);

// Get all mood entries
router.get('/api/mood', isAuthenticated, moodController.getMoods);

// Get a single mood entry by ID
router.get('/api/mood/:id', isAuthenticated, moodController.getMoodById);

// Update a mood entry by ID
router.put('/api/mood/:id', isAuthenticated, validateMood, moodController.updateMood);

// Delete a mood entry by ID
router.delete('/api/mood/:id', isAuthenticated, moodController.deleteMood);

module.exports = router;