const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const expiresIn = '1h';

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.name,
  };

  const token = jwt.sign(payload, secretKey, {expiresIn});
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
