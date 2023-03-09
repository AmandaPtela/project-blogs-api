const { userService } = require('../SERVICES/userService');

const userController = async (request, response) => {
  const user = request.body;
  console.log(user);
  const result = await userService(user);
  console.log(result);

  if (result.status === 201) return response.status(201).json({ token: result.token });
  response.status(result.status).json({ message: result.message });
};
module.exports = { userController };