const mongoose = require('mongoose');

// todo schema
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
        immutable: true,
        default: Date.now
    },
    is_completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);