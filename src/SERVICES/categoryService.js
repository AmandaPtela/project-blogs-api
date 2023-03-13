const Joi = require('joi');
const { Category } = require('../models');

const createCategoryService = async (user) => {
  const schema = Joi.object({ name: Joi.string()
    .required().label('name'),
  });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([user]);
  if (error) throw new Error(error.message);
  const result = await Category.create(user);
  return ({ status: 201, message: result });
};

module.exports = {
  createCategoryService,
};