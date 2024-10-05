const Session = require('../models/session.model');

// start a timer for session duration
const startDuration = (req, res) => {
    req.session.startTime = Date.now();
    res.status(200).json({ message: 'Session timer started' });
}

// add a new session for a specific user
const addSession = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { score, vr_minigame_name } = req.body;

        // Calculate duration
        const startTime = req.session.startTime;
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // Duration in seconds

        const newSession = new Session({
            user_id: userId,
            score: score,
            vr_minigame_name: vr_minigame_name,
            duration: duration
        });

        const savedSession = await newSession.save();
        res.status(201).json({ message: 'Session created successfully', session: savedSession });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}
// get session data for a specific user
const getSessionsByUserId = async (req, res) => {
    try {
        const userId = req.session.userId;

        const sessions = await Session.find({ user_id: userId });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

module.exports = {
    startDuration,
    addSession,
    getSessionsByUserId
}