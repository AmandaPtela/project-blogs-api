const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../Middlewares/generateToken');

const loginService = async (usuario) => {
  const schema = Joi.object({ email: Joi.string()
    .required().label('email'),
    password: Joi.string()
    .required().label('password'),
  });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([usuario]);
  const { email, password } = usuario;
  // console.log('RESULTADO: ------------------> ', User);
  if (error) return ({ status: 400, token: 'Some required fields are missing' });
  const result2 = await User.findOne({ where: { email } });
  if (!result2) return ({ status: 400, token: 'Invalid fields' });
  const result3 = await User.findOne({ where: { password } });
  if (!result3) return ({ status: 400, token: 'Invalid fields' });
  return ({ status: 200, token: generateToken(usuario) });
};

const createUserService = async (user) => {
  try {
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
  const result2 = await User.findOne({ where: { email } });
  if (result2) return ({ status: 409, message: 'User already registered' });
  const createUser = await User.create(user);
  return ({ status: 201, creation: createUser, find: result2, token: generateToken(user) });
} catch (error) { return { status: error.status, message: error.message }; }
};

async function getAllUsersService() {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return ({ status: 200, message: result });
}

async function getUserByEmailService(email) {
  const result = await User.findOne({ where: { email } });
  return ({ status: 200, message: result });
}
module.exports = { loginService, createUserService, getAllUsersService, getUserByEmailService };