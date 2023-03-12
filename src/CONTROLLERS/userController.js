const userService = require('../SERVICES/userService');

const loginController = async (request, response) => {
  const user = request.body;
  const result = await userService.loginService(user);

  if (result.status === 200) return response.status(200).json({ token: result.token });
  response.status(result.status).json({ message: result.token });
};

const getAllUsersController = async (_request, response) => {
  const result = await userService.getAllUsersService();
  response.status(result.status).json(result.message);
};

const createUserController = async (request, response) => {
  const user = request.body;
  const result = await userService.createUserService(user);

  if (result.status === 201) return response.status(201).json({ token: result.token });
  response.status(result.status).json({ message: result.message });
};
module.exports = { loginController, getAllUsersController, createUserController };