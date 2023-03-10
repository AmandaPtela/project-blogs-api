const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const loginService = async (usuario) => {
  const schema = Joi.object({ email: Joi.string()
    .required().label('email'),
    password: Joi.string()
    .required().label('password'),
  });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([usuario]);
  const { email, password } = usuario;
  console.log('RESULTADO: ------------------> ', User);
  if (error) return ({ status: 400, token: 'Some required fields are missing' });
  const result2 = await User.findOne({ where: { email } });
  if (!result2) return ({ status: 400, token: 'Invalid fields' });
  const result3 = await User.findOne({ where: { password } });
  if (!result3) return ({ status: 400, token: 'Invalid fields' });
  return ({ status: 200, token: generateToken(usuario) });
};
module.exports = { loginService };