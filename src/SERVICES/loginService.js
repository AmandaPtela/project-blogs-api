const Joi = require('joi');
const User = require('../models/index');
const generateToken = require('../utils/generateToken');

const loginService = async (user) => {
  const schema = Joi.object({ email: Joi.string()
    .required().label('email'),
    password: Joi.string()
    .required().label('password'),
  });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([user]);
  const { email, password } = user;
  if (error) return ({ status: 400, token: 'Some required fields are missing' });
  const result2 = await User.user.findOne({ where: { email } });
  if (!result2) return ({ status: 400, token: 'Invalid fields' });
  const result3 = await User.user.findOne({ where: { password } });
  if (!result3) return ({ status: 400, token: 'Invalid fields' });
  return ({ status: 200, token: generateToken(user) });
};
module.exports = { loginService };