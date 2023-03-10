const jwt = require('jsonwebtoken');
const { userByEmailService } = require('../SERVICES/userByEmailService');
require('dotenv/config');

async function validateToken(request, response, next) {
  const { authorization } = request.headers;
  const secret = process.env.JWT_SECRET;
  const { payload } = jwt.verify(authorization, secret);
  try {
    if (!authorization) {
      return response.status(401).json({ message: 'Token not found' });
    }

    const verify = await userByEmailService(payload.email);
    if (!verify) {
      return response.status(401).json({ message: 'Expired or invalid token' });
    }
  next();
  } catch(er) {
    return response.status(401).json({ message: er.message });
  }
}

module.exports = validateToken;