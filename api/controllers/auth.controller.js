const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// sign up user
const signUp = async (req, res) => {
    if (req.session.userId) {
        return res.send('User already signed in');
    }

    const data = req.body;
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        res.send('User already exists');
    } else {
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        const newUser = await User.create(data);
        res.send('User created');
        console.log(newUser);
    }
}

// log in user
const logIn = async (req, res) => {
    try {
        const check = await User.findOne({ email: req.body.email });
        if (!check) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            req.session.userId = check._id;
            res.status(200).json({ message: 'Login successful', userId: check._id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// log out user
const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/');
    });
}

module.exports = {
    signUp,
    logIn,
    logOut
}