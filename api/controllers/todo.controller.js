const Todo = require('../models/todo.model');
const { validationResult } = require('express-validator');

// add a new todo item for a specific user
const addTodoByUserId = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { task_description } = req.body;

        const newTodo = new Todo({
            user_id: userId,
            task_description: task_description
        });

        const savedTodo = await newTodo.save();
        res.status(201).json({ message: 'Todo item created successfully', todo: savedTodo });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// get todo items for a specific user
const getTodosByUserId = async (req, res) => {
    try {
        const userId = req.session.userId;

        const todos = await Todo.find({ user_id: userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// update a specific todo item for a user
const updateTodoById = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;
        const { task_description, is_completed } = req.body;

        const todo = await Todo.findOne({ _id: id, user_id: userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo item not found' });
        }

        if (task_description !== undefined) {
            todo.task_description = task_description;
        }
        if (is_completed !== undefined) {
            todo.is_completed = is_completed;
        }

        const updatedTodo = await todo.save();
        res.status(200).json({ message: 'Todo item updated successfully', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// add predefined todo items for a specific user
const addPredefinedTodos = async (req, res) => {
    try {
        const userId = req.session.userId;

        const predefinedTodos = [
            { task_description: 'Brush teeth' },
            { task_description: 'Shower' },
            { task_description: 'Fix bed' },
            { task_description: 'Take meds' },
            { task_description: 'Eat breakfast' }
        ];

        const todos = predefinedTodos.map(todo => ({
            ...todo,
            user_id: userId
        }));

        const savedTodos = await Todo.insertMany(todos);
        res.status(201).json({ message: 'Predefined todo items created successfully', todos: savedTodos });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

module.exports = {
    addTodoByUserId,
    getTodosByUserId,
    updateTodoById,
    addPredefinedTodos
}