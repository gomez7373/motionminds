const Daily = require('../models/daily.model');
const Session = require('../models/session.model');
const Todo = require('../models/todo.model');
const Mood = require('../models/mood.model');

// Create a new daily entry for a specific user
const createDaily = async (req, res) => {
    try {
        const { user_id, date } = req.body;

        // Ensure date is in ISO format
        const today = new Date(date).toISOString();

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

        // Query Mood for the current date
        const mood = await Mood.findOne({
            user_id,
            date: { $gte: today }
        });

        // Log fetched data for debugging
        console.log('Fetched Todos:', todos);
        console.log('Fetched Sessions:', sessions);
        console.log('Fetched Mood:', mood);

        // Create new Daily entry
        const newDaily = new Daily({
            user_id,
            todo_id: todos.length > 0 ? todos.map(todo => todo._id) : [], // Send an empty array if no todos found
            session_id: sessions.length > 0 ? sessions.map(session => session._id) : [], // Send an empty array if no sessions found
            mood_id: mood ? mood._id : null,
            date: today,
            tasks_completed: todos.filter(todo => todo.is_completed).length,
            session_highscore: sessions.length > 0 ? Math.max(...sessions.map(session => session.score)) : 0, // Set to 0 if no sessions
            mood: mood ? mood.mood : ''
        });

        // Save to database
        await newDaily.save();

        // Send response
        res.status(201).json(newDaily);
    } catch (error) {
        console.error('Error creating daily entry:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all daily entries by user ID
const getDaily = async (req, res) => {
    try {
        const userId = req.query.user_id;

        if (!userId) return res.status(400).json({ message: 'User ID is required' });

        const dailyEntries = await Daily.find({ user_id: userId }).populate('mood_id');

        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for this user' });
        }

        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get daily stats for the current date
const getDailyStats = async (req, res) => {
    try {
        const userId = req.query.user_id;

        if (!userId) return res.status(400).json({ message: 'User ID is required' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyEntry = await Daily.findOne({ user_id: userId, date: { $gte: today } }).populate('mood_id');

        if (!dailyEntry) {
            return res.status(404).json({ message: 'No daily entry found for today' });
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get daily entry by user ID and date
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
        }).populate('mood_id');  // Ensure mood_id is populated

        if (!dailyEntry) {
            return res.status(204).send(); // No content
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        console.error('Error fetching daily entry:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update daily progress with mood and scores
const updateDailyProgress = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const { mood_id, mood } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Daily progress ID is required' });
        }

        if (mood_id) {
            const moodDoc = await Mood.findById(mood_id);
            if (!moodDoc) {
                return res.status(404).json({ message: 'Invalid mood_id' });
            }
        }

        const dailyProgress = await Daily.findById(id);
        if (!dailyProgress) {
            return res.status(404).json({ message: 'Daily progress not found' });
        }

        const startOfDay = new Date(dailyProgress.date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const sessions = await Session.find({
            user_id: dailyProgress.user_id,
            date_played: { $gte: startOfDay, $lte: endOfDay }
        });

        const todos = await Todo.find({
            user_id: dailyProgress.user_id,
            date_created: { $gte: startOfDay, $lte: endOfDay }
        });

        const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
        const tasksCompleted = todos.filter(todo => todo.is_completed).length;

        const updatedDaily = await Daily.findByIdAndUpdate(
            id,
            {
                session_highscore: totalScore,
                tasks_completed: tasksCompleted,
                mood_id,  // Update mood_id if provided
                mood      // Update mood string if provided
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