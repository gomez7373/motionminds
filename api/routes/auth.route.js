const express = require('express');
const { signUp, logIn, logOut } = require('../controllers/auth.controller');
const router = express.Router();

// signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', signUp);

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

// login user
router.post('/login', logIn);

// logout user
router.get('/logout', logOut);

module.exports = router;