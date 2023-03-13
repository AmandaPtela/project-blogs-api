const categoryService = require('../SERVICES/categoryService');

const createCategoryController = async (request, response) => {
  try {
    const user = request.body;
    const result = await categoryService.createCategoryService(user);
    return response.status(result.status).json(result.message);
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
};

module.exports = {
  createCategoryController,
};