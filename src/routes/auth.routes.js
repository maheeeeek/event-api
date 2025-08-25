const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile, updateProfile } = require('../controllers/auth.controller');
const { registerRules, loginRules } = require('../validators/auth.validators');
const { protect } = require('../middleware/auth');

router.post('/register', registerRules, register);
router.post('/login', loginRules, login);
router.post('/logout', logout);
router.get('/me', protect, getProfile);
router.patch('/profile', protect, updateProfile);

module.exports = router;
