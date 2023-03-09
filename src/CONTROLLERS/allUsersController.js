const { allUsersService } = require('../SERVICES/allUsersService');

const allUsersController = async (_request, response) => {
  const result = await allUsersService();
  response.status(result.status).json(result.message);
};

module.exports = { allUsersController };