const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: false
    },
    date_of_birth: {
        type: Date,
        require: false
    },
    date_created: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    this.last_login = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);