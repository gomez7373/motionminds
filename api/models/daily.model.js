const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    tasks_completed: {
        type: Number,
        required: true,
        default: 0
    }
});



module.exports = mongoose.model('Daily', dailySchema);