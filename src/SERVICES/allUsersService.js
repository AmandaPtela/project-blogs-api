const User = require('../models/index');

const allUsersService = async () => {
  const result = await User.user.findAll();
  return ({ status: 200, message: result });
};
module.exports = { allUsersService };