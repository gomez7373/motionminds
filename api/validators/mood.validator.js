const { body, validationResult } = require('express-validator');

const validateMood = [
    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid User ID format'),
    body('mood')
        .notEmpty().withMessage('Mood is required')
        .isString().withMessage('Mood must be a string'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Invalid date format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateMood
};