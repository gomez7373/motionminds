const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
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
    gender: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    profile_picture: {
        type: String,
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
    if (this.date_of_birth) {
        this.date_of_birth = new Date(this.date_of_birth.toISOString());
    }
    next();
});

module.exports = mongoose.model('User', userSchema);