const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Read JWT from cookie named 'token'
const protect = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('Not authorized');
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorized'));
  }
};

module.exports = { protect };
