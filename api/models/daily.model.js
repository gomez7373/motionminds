const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todo_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
        required: true
    }],
    session_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    }],
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    tasks_completed: {
        type: Number,
        required: false,
        default: 0
    },
    session_highscore: {
        type: Number,
        required: false,
        default: 0
    }

});

module.exports = mongoose.model('Daily', dailySchema);