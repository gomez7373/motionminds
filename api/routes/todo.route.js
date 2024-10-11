const express = require('express');
const { addTodoByUserId, getTodosByUserId, getTodosById, updateTodoById, addPredefinedTodos } = require('../controllers/todo.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const { validateTodoEntry, validateTodoIdParam } = require('../validators/todo.validator');
const {handleValidationErrors} = require('../middleware/validator.middleware.js');
const router = express.Router();

// add a new todo item for a specific user
router.post('/api/todo', isAuthenticated, validateTodoEntry, handleValidationErrors, addTodoByUserId);

// get todo items for a specific user
router.get('/api/todo', isAuthenticated, getTodosByUserId);

// get todo items for a specific user by current date
router.get('/api/todo/user/today', isAuthenticated, getTodosByCurrentDate);

// get a specific todo item for a user
router.get('/api/todo/:id', isAuthenticated, validateTodoIdParam, getTodosById);

// update a specific todo item for a user
router.put('/api/todo/:id', isAuthenticated, validateTodoIdParam, validateTodoEntry, handleValidationErrors, updateTodoById);

// add predefined todo items for a specific user
router.post('/api/todo/predefined', isAuthenticated, addPredefinedTodos);

module.exports = router;