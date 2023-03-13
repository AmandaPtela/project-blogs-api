const userService = require('../SERVICES/userService');

const loginController = async (request, response) => {
  const user = request.body;
  const result = await userService.loginService(user);

  if (result.status === 200) return response.status(200).json({ token: result.token });
  return response.status(result.status).json({ message: result.token });
};

const getAllUsersController = async (_request, response) => {
  try {
    const result = await userService.getAllUsersService();
    response.status(result.status).json(result.message);
  } catch (error) {
    return response.status(error.status).json(error.message);
  }
};

const createUserController = async (request, response) => {
  const user = request.body;
  const result = await userService.createUserService(user);

  if (result.status === 201) return response.status(201).json({ token: result.token });
  return response.status(result.status).json({ message: result.message });
};

const getUserByIdController = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await userService.getUserByIdService(id);
    console.log(result);
    if (result.status === 404) return response.status(404).json({ message: result.message });
    return response.status(result.status).json(result.result);
  } catch (error) {
    return response.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  loginController,
  getAllUsersController,
  createUserController,
  getUserByIdController,
};