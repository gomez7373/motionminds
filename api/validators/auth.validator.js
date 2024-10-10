const { body } = require('express-validator');

const validateSignUp = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('first_name').notEmpty().withMessage('First name cannot be empty'),
    body('last_name').notEmpty().withMessage('Last Name cannot be empty')
];

const validateLogIn = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password cannot be empty')
];

module.exports = {
    validateSignUp,
    validateLogIn
};