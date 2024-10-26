const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        required: true,
        enum: ['happy', 'numb', 'sad']
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Mood', moodSchema);