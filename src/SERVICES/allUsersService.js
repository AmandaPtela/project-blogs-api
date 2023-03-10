const { User } = require('../models');

const allUsersService = async () => {
  const result = await User.findAll();
  return ({ status: 200, message: result });
};
module.exports = { allUsersService };