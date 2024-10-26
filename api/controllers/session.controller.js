const Session = require('../models/session.model');

// Add a new session for a specific user
const addSession = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { score, vr_minigame_name, duration } = req.body;

        const newSession = new Session({
            user_id: userId,
            score: score,
            vr_minigame_name: vr_minigame_name,
            duration: duration,
            date_played: new Date() // Set the current date and time
        });

        const savedSession = await newSession.save();
        res.status(201).json({ message: 'Session created successfully', session: savedSession });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get session data for a specific user
const getSessionsByUserId = async (req, res) => {
    try {
        const userId = req.session.userId;

        const sessions = await Session.find({ user_id: userId });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get session data by id
const getSessionById = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;

        const session = await Session.findOne({ _id: id, user_id: userId });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get today's session for the logged-in user
const getSession = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

        const sessions = await Session.find({
            user_id: userId,
            date_played: { $gte: startOfDay, $lt: endOfDay }
        });

        if (!sessions.length) {
            return res.status(200).json([]); // Return empty array instead of 404
        }
        

        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


module.exports = {
    addSession,
    getSessionsByUserId,
    getSessionById,
    getSession
};