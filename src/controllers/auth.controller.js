const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const cookieOptions = {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};


exports.register = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name, email, password, phoneNumber } = req.body;


const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already registered' });


const user = await User.create({ name, email, password, phoneNumber });


const token = generateToken(user._id);
res
.cookie('token', token, cookieOptions)
.status(201)
.json({
message: 'Registered successfully',
user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber },
});
};


exports.login = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await user.matchPassword(password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


const token = generateToken(user._id);
res
  .cookie('token', token, cookieOptions)
  .json({ message: 'Login successful', token });
}