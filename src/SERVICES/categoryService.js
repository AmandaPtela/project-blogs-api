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

const getAllCategoriesService = async () => {
  const result = await Category.findAll();
  return ({ status: 200, message: result });
};

module.exports = {
  createCategoryService,
  getAllCategoriesService,
};