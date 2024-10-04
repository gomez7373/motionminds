const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task_description: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    is_completed: {
        type: Boolean,
        default: false
    }
});