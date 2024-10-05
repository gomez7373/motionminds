const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

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
}

module.exports = {
    getUserById,
    updateUserById
}