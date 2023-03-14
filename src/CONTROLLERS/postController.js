const postService = require('../SERVICES/postService');

const createPostController = async (request, response) => {
  const post = request.body;
  const userId = request.user.id;
  const result = await postService.createPostService(post, userId);
  const a = result.message;
  // eslint-disable-next-line object-shorthand, max-len
  const fullResult = { title: a.title, content: a.content, postCategories: a.categoryIds, userId: userId };
  if (result.status !== 400) return response.status(201).json(fullResult);
  if (result.message.includes('not found')) {
    return response
    .status(result.status)
    .json({ message: 'one or more "categoryIds" not found' });
  }
  if (result.message.includes('required')) {
    return response
    .status(result.status)
    .json({ message: 'Some required fields are missing' }); 
  }
};

const getByIdPostController = async (request, response) => {
  const { id } = request.params;
  const result = await postService.getByIdPostService(id);
  if (result.status === 404) { 
    return response.status(result.status)
  .json({ message: 'Post does not exist' });
}
  return response.status(result.status).json(result.message);
};

const getAllPostController = async (_request, response) => {
  const result = await postService.getAllPostService();

  return response.status(result.status).json(result.message);
};

const updatePostController = async (request, response) => {
  const { id } = request.params;
  const changes = request.body;
  const result = await postService.updatePostService(id, changes);
  if (result.status === 400) {
    return response.status(400)
  .json({ message: 'Some required fields are missing' });
  }
  console.log(result.message);
  return response.status(result.status).json(result.message);
};

module.exports = {
  createPostController,
  getByIdPostController,
  getAllPostController,
  updatePostController,
};