const express = require('express');
const { getUserById, updateUserById } = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const router = express.Router();

// user routes

// retrieve user data
router.get('/api/user/:id', isAuthenticated, getUserById);

// update user data
router.put('/api/user/:id', isAuthenticated, updateUserById);

module.exports = router;