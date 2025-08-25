const { body } = require('express-validator');


const registerRules = [
body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
body('email').isEmail().withMessage('Valid email required'),
body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
body('phoneNumber').optional().isLength({ min: 6 }).withMessage('Phone seems short'),
];


const loginRules = [
body('email').isEmail().withMessage('Valid email required'),
body('password').notEmpty().withMessage('Password required'),
];


module.exports = { registerRules, loginRules };