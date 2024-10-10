const { body, param } = require('express-validator');

const validateSessionIdParam = [
    param('id').isMongoId().withMessage('Invalid Session ID')
];

const validateSessionData = [
    body('score').isInt({ min: 0 }).withMessage('Score must be a non-negative integer'),
    body('vr_minigame_name').notEmpty().withMessage('VR minigame name is required'),
    body('duration').optional().isInt({ min: 0 }).withMessage('Duration must be a non-negative integer')
];

module.exports = {
    validateSessionIdParam,
    validateSessionData
};