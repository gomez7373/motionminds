const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    date_of_birth: {
        type: Date,
        require: false
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);