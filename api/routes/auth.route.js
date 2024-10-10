const express = require('express');
const { signUp, logIn, logOut } = require('../controllers/auth.controller');
const { validateSignUp, validateLogIn } = require('../validators/auth.validator');
const {handleValidationErrors} = require('../middleware/validator.middleware.js');
const router = express.Router();

// signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// signup user
router.post('/signup', validateSignUp, handleValidationErrors, signUp);

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

// login user
router.post('/login', validateLogIn, handleValidationErrors, logIn);

// logout user
router.get('/logout', logOut);

module.exports = router;