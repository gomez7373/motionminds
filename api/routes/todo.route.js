const express = require('express');
const { addTodoByUserId, getTodosByUserId, updateTodoById, addPredefinedTodos } = require('../controllers/todo.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { validateTodoEntry, validateTodoIdParam } = require('../validators/todo.validator');
const {handleValidationErrors} = require('../middleware/validator.middleware.js');
const router = express.Router();

// add a new todo item for a specific user
router.post('/api/todo', isAuthenticated, validateTodoEntry, handleValidationErrors, addTodoByUserId);

// get todo items for a specific user
router.get('/api/todo', isAuthenticated, getTodosByUserId);

// update a specific todo item for a user
router.put('/api/todo/:id', isAuthenticated, validateTodoIdParam, validateTodoEntry, handleValidationErrors, updateTodoById);

// add predefined todo items for a specific user
router.post('/api/todo/predefined', isAuthenticated, addPredefinedTodos);

module.exports = router;