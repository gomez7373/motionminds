const Daily = require('../models/daily.model');
const Session = require('../models/session.model');
const Todo = require('../models/todo.model');

// Create a new daily entry for a specific user
const createDaily = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Get the current date and set the time to 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Query Todos for the current date
        const todos = await Todo.find({
            user_id,
            date_created: { $gte: today }
        });

        // Query Sessions for the current date
        const sessions = await Session.find({
            user_id,
            date_played: { $gte: today }
        });

        // Create new Daily entry
        const newDaily = new Daily({
            user_id,
            todo_id: todos.length > 0 ? todos.map(todo => todo._id) : [], // Send an empty array if no todos found
            session_id: sessions.length > 0 ? sessions.map(session => session._id) : [], // Send an empty array if no sessions found
            date: today,
            tasks_completed: todos.filter(todo => todo.is_completed).length,
            session_highscore: sessions.length > 0 ? Math.max(...sessions.map(session => session.score)) : 0 // Set to 0 if no sessions
        });

        // Save to database
        await newDaily.save();

        // Send response
        res.status(201).json(newDaily);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all daily entries by user id
const getDaily = async (req, res) => {
    try {
        const userId = req.query.user_id; // Get user ID from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const dailyEntries = await Daily.find({ user_id: userId });

        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for this user' });
        }

        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get daily stats by user id for the current date
const getDailyStats = async (req, res) => {
    try {
        const userId = req.query.user_id; // Get user ID from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Get the current date and set the time to 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Query Daily for the current date
        const dailyEntry = await Daily.findOne({
            user_id: userId,
            date: { $gte: today }
        });

        if (!dailyEntry) {
            return res.status(404).json({ message: 'No daily entry found for today' });
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get daily entry by user id and date


const getDailyByDate = async (req, res) => {
    try {
        const userId = req.query.user_id; 
        const dateParam = req.params.date; 
        
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        if (!dateParam) return res.status(400).json({ message: 'Date is required' });

        const startOfDay = new Date(dateParam);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const dailyEntry = await Daily.findOne({
            user_id: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (!dailyEntry) {
            // Return 204 No Content instead of 404
            return res.status(204).send(); // Or res.json({ message: 'No daily entry found for the specified date' });
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        console.error('Error fetching daily entry:', error);
        res.status(500).json({ message: error.message });
    }
};


const updateDailyProgress = async (req, res) => {
    try {
        const { user_id, date } = req.body;

        if (!user_id || !date) {
            return res.status(400).json({ message: 'User ID and date are required' });
        }

        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Fetch sessions and todos for the specified date
        const sessions = await Session.find({
            user_id,
            date_played: { $gte: startOfDay, $lte: endOfDay }
        });

        const todos = await Todo.find({
            user_id,
            date_created: { $gte: startOfDay, $lte: endOfDay }
        });

        const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
        const tasksCompleted = todos.filter(todo => todo.is_completed).length;

        // Update the daily entry with the new scores and completed tasks
        const updatedDaily = await Daily.findOneAndUpdate(
            { user_id, date: { $gte: startOfDay, $lte: endOfDay } },
            {
                session_highscore: totalScore,
                tasks_completed: tasksCompleted
            },
            { new: true }
        );

        if (!updatedDaily) {
            return res.status(404).json({ message: 'Daily progress not found' });
        }

        res.status(200).json(updatedDaily);
    } catch (error) {
        console.error('Error updating daily progress:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createDaily,
    getDaily,
    getDailyStats,
    getDailyByDate,
    updateDailyProgress
};