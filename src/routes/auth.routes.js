const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { registerRules, loginRules } = require('../validators/auth.validators');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerRules, register);

// @route   POST /api/auth/login
router.post('/login', loginRules, login);

module.exports = router;
