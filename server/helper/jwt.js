const jwt = require('jsonwebtoken');
const JWT_SECRET = 'anysecretkeyhere...';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
