const express = require('express');
const { signUp, logIn, logOut } = require('../controllers/auth.controller');
const { validateSignUp, validateLogIn } = require('../validators/auth.validator');
const { handleValidationErrors } = require('../middleware/validator.middleware');
const router = express.Router();


// signup user
router.post('/api/signup', validateSignUp, handleValidationErrors, signUp);

// login user
router.post('/api/login', validateLogIn, handleValidationErrors, logIn);

// logout user
router.post('/api/logout', logOut);

//

module.exports = router;