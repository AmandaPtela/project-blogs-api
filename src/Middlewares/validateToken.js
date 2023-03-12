const jwt = require('jsonwebtoken');
// const userService = require('../SERVICES/userService');
require('dotenv/config');

async function validateToken(request, response, next) {
  try {
    const { authorization } = request.headers;
    const secret = process.env.JWT_SECRET;
  
    if (!authorization) {
      return response.status(401).json({ message: 'Token not found' });
    }
  
    const payload = await jwt.verify(authorization, secret);
    // const user = await userService.getUserByEmailService(payload.payload.email);
    request.user = payload;
  } catch (error) {
  console.log(error);
    response.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
}

module.exports = validateToken;