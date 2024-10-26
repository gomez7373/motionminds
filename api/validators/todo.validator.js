const { body, param } = require('express-validator');

const validateTodoEntry = [
    body('task_description').notEmpty().withMessage('Task description is required'),
    body('is_completed').optional().isBoolean().withMessage('Is completed must be a boolean')
];

const validateTodoIdParam = [
    param('id').isMongoId().withMessage('Invalid Todo ID')
];

module.exports = {
    validateTodoEntry,
    validateTodoIdParam
};