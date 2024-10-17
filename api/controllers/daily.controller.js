const mongoose = require('mongoose');
const Daily = require('../models/daily.model');
const Session = require('../models/session.model');
const Todo = require('../models/todo.model');

// get daily entries for today
const getDaily = async (req, res) => {
    try {
        const userId = req.session.userId;

        // Get the current date in YYYY-MM-DD format
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

        const dailyEntries = await Daily.find({
            user_id: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for today' });
        }

        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// get a daily entry by id
const getDailyById = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;

        const dailyEntry = await Daily.findOne({ _id: id, user_id: userId });
        if (!dailyEntry) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// get daily entries by date
const getDailyByDate = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { date } = req.params;

        const dailyEntries = await Daily.find({ user_id: userId, date: new Date(date) });
        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for this date' });
        }

        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// get daily stats
const getDailyStats = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { date } = req.body;

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Find all daily entries for the user within the specified date range
        const dailyEntries = await Daily.find({
            user_id: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for this date' });
        }

        // Count completed tasks
        let completedTasksCount = 0;
        for (const daily of dailyEntries) {
            for (const todoId of daily.todo_id) {
                const todo = await Todo.findOne({ _id: todoId, user_id: userId });
                if (todo && todo.is_completed) {
                    completedTasksCount++;
                }
            }
        }

        // Sum of scores
        let totalScore = 0;
        for (const daily of dailyEntries) {
            for (const sessionId of daily.session_id) {
                const session = await Session.findOne({ _id: sessionId, user_id: userId });
                if (session) {
                    totalScore += session.score;
                }
            }
        }

        res.status(200).json({
            completedTasksCount,
            totalScore
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// create a new daily entry
const createDaily = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { date, tasks_completed, sessions, todos } = req.body;

        const sessionIds = [];
        for (const session of sessions) {
            const newSession = new Session({
                user_id: userId,
                date_played: session.date_played,
                score: session.score,
                vr_minigame_name: session.vr_minigame_name,
                duration: session.duration
            });
            const savedSession = await newSession.save();
            sessionIds.push(savedSession._id);
        }

        const todoIds = [];
        for (const todo of todos) {
            const newTodo = new Todo({
                user_id: userId,
                task_description: todo.task_description,
                is_completed: todo.is_completed
            });
            const savedTodo = await newTodo.save();
            todoIds.push(savedTodo._id);
        }

        const newDaily = new Daily({
            user_id: userId,
            date: date,
            tasks_completed: tasks_completed,
            session_id: sessionIds,
            todo_id: todoIds
        });
        const savedDaily = await newDaily.save();

        res.status(201).json({ message: 'Daily entry created successfully', daily: savedDaily });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// update a daily entry
const updateDaily = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;
        const { date, tasks_completed, sessions, todos } = req.body;

        const daily = await Daily.findOne({ _id: id, user_id: userId });
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        // Update Sessions
        for (const session of sessions) {
            const sessionToUpdate = await Session.findOne({ _id: session._id, user_id: userId });
            if (sessionToUpdate) {
                sessionToUpdate.date_played = session.date_played || sessionToUpdate.date_played;
                sessionToUpdate.score = session.score || sessionToUpdate.score;
                sessionToUpdate.vr_minigame_name = session.vr_minigame_name || sessionToUpdate.vr_minigame_name;
                sessionToUpdate.duration = session.duration || sessionToUpdate.duration;
                await sessionToUpdate.save();
            }
        }

        // Update Todos
        for (const todo of todos) {
            const todoToUpdate = await Todo.findOne({ _id: todo._id, user_id: userId });
            if (todoToUpdate) {
                todoToUpdate.task_description = todo.task_description || todoToUpdate.task_description;
                todoToUpdate.is_completed = todo.is_completed !== undefined ? todo.is_completed : todoToUpdate.is_completed;
                await todoToUpdate.save();
            }
        }

        // Update Daily
        daily.date = date || daily.date;
        daily.tasks_completed = tasks_completed || daily.tasks_completed;
        const updatedDaily = await daily.save();

        res.status(200).json({ message: 'Daily entry updated successfully', daily: updatedDaily });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    getDaily,
    getDailyById,
    getDailyByDate,
    getDailyStats,
    createDaily,
    updateDaily
};