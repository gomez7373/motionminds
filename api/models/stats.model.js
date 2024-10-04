const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_tasks: {
        type: Number,
        required: true
    },
    total_vr_sessions: {
        type: Number,
        required: true
    },
    avg_vr_score : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stats', statsSchema);