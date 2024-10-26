const Mood = require('../models/mood.model.js');

// Create a new mood entry
exports.createMood = async (req, res) => {
    try {
        const mood = new Mood({
            user_id: req.body.user_id,
            mood: req.body.mood,
            date: req.body.date
        });
        const savedMood = await mood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all mood entries
// Get all mood entries for the current date
exports.getMoods = async (req, res) => {
    try {
        // Get the current date and set the time to 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Query Mood for the current date
        const moods = await Mood.find({
            date: { $gte: today }
        });

        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get a single mood entry by ID
exports.getMoodById = async (req, res) => {
    try {
        const mood = await Mood.findById(req.params.id);
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json(mood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a mood entry by ID
exports.updateMood = async (req, res) => {
    try {
        const { user_id, mood } = req.body;

        // Get the current date and set the time to 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find and update the mood entry for the current date
        const updatedMood = await Mood.findOneAndUpdate(
            { user_id, date: { $gte: today } },
            { mood },
            { new: true, runValidators: true }
        );

        if (!updatedMood) {
            return res.status(404).json({ message: 'Mood entry for today not found' });
        }

        res.status(200).json(updatedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a mood entry by ID 
exports.deleteMood = async (req, res) => {
    try {
        const mood = await Mood.findByIdAndDelete(req.params.id);
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json({ message: 'Mood deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};