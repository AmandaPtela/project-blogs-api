const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const configJwt = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function generateToken(payload) {
  const token = jwt.sign({ payload }, secret, configJwt);
  return token.toString();
}

module.exports = generateToken;