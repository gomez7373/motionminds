const { body, param } = require('express-validator');

const validateUserIdParam = [
    param('id').isMongoId().withMessage('Invalid User ID')
];

const validateUserUpdate = [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
    body('last_name').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
    body('date_of_birth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('phone').optional().isMobilePhone().withMessage('Phone must be a valid mobile number'),
    body('profile_picture').optional().isURL().withMessage('Profile picture must be a valid URL')
];

module.exports = {
    validateUserIdParam,
    validateUserUpdate
};