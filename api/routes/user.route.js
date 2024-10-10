const express = require('express');
const { getUserById, updateUserById } = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { validateUserIdParam, validateUserUpdate } = require('../validators/user.validator');
const {handleValidationErrors} = require('../middleware/validator.middleware.js');
const router = express.Router();

// user routes

// retrieve user data
router.get('/api/user/:id', isAuthenticated, validateUserIdParam, handleValidationErrors, getUserById);

// update user data
router.put('/api/user/:id', isAuthenticated, validateUserIdParam, validateUserUpdate, handleValidationErrors, updateUserById);

module.exports = router;