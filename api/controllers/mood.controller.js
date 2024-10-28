const Mood = require('../models/mood.model.js');

// Create a new mood entry
exports.createMood = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today
        
        const mood = new Mood({
            user_id: req.body.user_id,
            mood: req.body.mood,
            date: today  // Ensure today's date is used
        });
        
        const savedMood = await mood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get the latest mood for the user
// Get the latest mood for the user for today
exports.getMood = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Set end of today

        const mood = await Mood.findOne({
            user_id: req.query.user_id,
            date: { $gte: today, $lt: tomorrow } // Only today's date range
        }).sort({ date: -1 }); // Get latest by date descending

        if (!mood) {
            return res.status(200).json({ mood: '', _id: null });
        }

        res.status(200).json(mood);
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const updatedMood = await Mood.findOneAndUpdate(
            { user_id: req.body.user_id, date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } },
            { mood: req.body.mood },
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