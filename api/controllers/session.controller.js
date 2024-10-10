const Session = require('../models/session.model');


// add a new session for a specific user
const addSession = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { score, vr_minigame_name, duration } = req.body;

        
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
}

module.exports = {
    addSession,
    getSessionsByUserId,
    getSessionById
}