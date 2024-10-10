const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// sign up user
const signUp = async (req, res) => {
    if (req.session.userId) {
        return res.status(400).send('User already signed in');
    }

    const {
        email,
        password,
        first_name,
        last_name
    } = req.body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ message: 'Email, password, first name, and last name are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hash,
        first_name,
        last_name
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
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