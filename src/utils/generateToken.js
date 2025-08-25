const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
