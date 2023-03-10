const { User } = require('../models');

async function userByEmailService(email) {
  const result = await User.findOne({ where: { email } });
  return ({ status: 200, message: result });
}
module.exports = { userByEmailService };