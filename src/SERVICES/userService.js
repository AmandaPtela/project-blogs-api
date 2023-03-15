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
  if (error) return ({ status: 400, token: 'Some required fields are missing' });
  const result2 = await User.findOne({ where: { email } });
  if (!result2) return ({ status: 400, token: 'Invalid fields' });
  const result3 = await User.findOne({ where: { password } });
  if (!result3) return ({ status: 400, token: 'Invalid fields' });
  const user = await User.findOne({ where: { email } });
  return ({ status: 200, token: generateToken({ email, id: user.id }) });
};

const createUserService = async (user) => {
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
  const result = await User.findOne({ where: { email } });
  if (result) return ({ status: 409, message: 'User already registered' });
  const createUser = await User.create(user);
  const usr = await User.findOne({ where: { email } });
  return ({
    status: 201, creation: createUser, find: result, token: generateToken({ email, id: usr.id }) });
};
async function getAllUsersService() {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return ({ status: 200, message: result });
}

async function getUserByEmailService(email) {
  const result = await User.findOne({ where: { email } });
  return ({ status: 200, message: result });
}

const getUserByIdService = async (id) => {
  const result = await User.findOne({ where: { id } });
  if (!result) return ({ status: 404, message: 'User does not exist' });
  return ({
    status: 200,
    result: {
      id: result.id,
      displayName: result.displayName,
      email: result.email,
      image: result.image,
    } });
};

const deleteUserService = async (myId) => {
  const meUser = await User.findOne({
    where: { id: myId } });
  if (!meUser) {
    return { status: 404 };
  }
  await meUser.destroy();
  return ({ status: 204 });
};
module.exports = {
  loginService,
  createUserService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
  deleteUserService,
};