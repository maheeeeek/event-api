const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// POST /api/auth/register
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, phoneNumber } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, phoneNumber });
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber } });
};

// POST /api/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.json({ user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber } });
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  res.json({ message: 'Logged out' });
};

// GET /api/auth/me
const getProfile = async (req, res) => {
  res.json({ user: req.user });
};

// PATCH /api/auth/profile
const updateProfile = async (req, res) => {
  const { name, phoneNumber } = req.body;
  if (name !== undefined) req.user.name = name;
  if (phoneNumber !== undefined) req.user.phoneNumber = phoneNumber;
  await req.user.save();
  res.json({ user: req.user });
};

module.exports = { register, login, logout, getProfile, updateProfile };
