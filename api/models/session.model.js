const mongoose = require('mongoose');

//session schema
const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date_played: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    score: {
        type: Number,
        required: true
    },
    vr_minigame_name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Session', sessionSchema);