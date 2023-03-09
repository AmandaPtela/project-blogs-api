const Joi = require('joi');
const User = require('../models/index');
const generateToken = require('../utils/generateToken');

const userService = async (user) => {
  const schema = Joi.object({ displayName: Joi.string().min(8)
    .required().label('displayName'),
    email: Joi.string().email()
    .required().label('email'),
    password: Joi.string().min(6)
    .required().label('password'),
    image: Joi.string().label('image'),
  });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([user]);
  const { email } = user;
  if (error) return ({ status: 400, message: error.message });
  const result2 = await User.user.findOne({ where: { email } });
  if (result2) return ({ status: 409, message: 'User already registered' });
  const result = await User.user.create(user);
  return ({ status: 201, message: result, token: generateToken(user) });
};
module.exports = { userService };