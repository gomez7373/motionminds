const express = require('express');
const { getUserById, getAllUsers, updateUserById } = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { validateUserIdParam, validateUserUpdate } = require('../validators/user.validator');
const { handleValidationErrors } = require('../middleware/validator.middleware.js');
const router = express.Router();

// Retrieve user data by ID
router.get('/api/user', isAuthenticated, getUserById);

// Retrieve all users
router.get('/api/users', isAuthenticated, getAllUsers);

// Update user data
router.put('/api/user/:id', isAuthenticated, validateUserIdParam, handleValidationErrors, updateUserById);

module.exports = router;