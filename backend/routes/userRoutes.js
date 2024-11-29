const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

// User Signup
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    signup
);

// User Login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    login
);

module.exports = router;