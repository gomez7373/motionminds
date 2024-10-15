const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Retrieve user data by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.session.userId; // Get user ID from session
    const token = req.session.token; // Get token from session

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Current user response:', { token, user }); // Log the user data
    res.status(200).json({ token, user }); // Include token in response
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

// Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'password') { // Exclude password from direct update
        user[key] = req.body[key];
      }
    });

    // If password is being updated, hash it
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUserById
};