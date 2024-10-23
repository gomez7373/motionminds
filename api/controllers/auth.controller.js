const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// Log in user
// Log in user
const logIn = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({ error: 'Email does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'super+secret+key', { expiresIn: '3h' });

      // Store user ID and token in session
      req.session.userId = user._id;
      req.session.token = token;

      res.status(200).json({
          token,
          message: 'Login successful',
          user: { first_name: user.first_name, email: user.email }
      });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

  
// log out user
const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        console.log('Logged out successfully');
        return res.status(200).json({ message: 'Logged out successfully' });
      });
}

module.exports = {
    signUp,
    logIn,
    logOut
}