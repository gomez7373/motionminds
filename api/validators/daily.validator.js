const { body, param } = require('express-validator');

const validateDateParam = [
    param('date').isISO8601().withMessage('Date must be in ISO8601 format')
];

const validateDailyEntry = [
    body('date').optional().isISO8601().withMessage('Date must be in ISO8601 format'),
    body('tasks_completed').optional().isInt({ min: 0 }).withMessage('Tasks completed must be a non-negative integer')
];

module.exports = {
    validateDateParam,
    validateDailyEntry
};