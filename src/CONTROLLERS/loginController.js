const { loginService } = require('../SERVICES/loginService');

const loginController = async (request, response) => {
  const user = request.body;
  const result = await loginService(user);

  if (result.status === 200) return response.status(200).json({ token: result.token });
  response.status(result.status).json({ message: result.token });
};
module.exports = { loginController };