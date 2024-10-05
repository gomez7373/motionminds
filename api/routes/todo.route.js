const express = require('express');
const { addTodoByUserId, getTodosByUserId, updateTodoById, addPredefinedTodos } = require('../controllers/todo.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/api/todo', (req, res) => {
    res.send('Todo route');
});
// add a new todo item for a specific user
router.post('/api/todo/', isAuthenticated, addTodoByUserId);

// get todo items for a specific user
router.get('/api/todo/', isAuthenticated, getTodosByUserId);

// update a specific todo item for a user
router.put('/api/todo/:userid', isAuthenticated, updateTodoById);

// add predefined todo items for a specific user
router.post('/api/todo/predefined', isAuthenticated, addPredefinedTodos);



module.exports = router;