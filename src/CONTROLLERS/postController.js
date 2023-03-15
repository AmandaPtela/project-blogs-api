const postService = require('../SERVICES/postService');

const createPostController = async (request, response) => {
  const post = request.body;
  const userId = request.user.id;
  const result = await postService.createPostService(post, userId);
  if (result.status !== 400) return response.status(201).json(result.message);
  if (result.erro) { 
    return response.status(400)
  .json({ message: 'Some required fields are missing' });
  }
  if (result.message.includes('not found')) {
    return response.status(result.status)
    .json({ message: 'one or more "categoryIds" not found' });
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
  const user = request.user.id;
  const changes = request.body;
  const result = await postService.updatePostService(user, id, changes);
  console.log(result);
  if (result.status === 400) {
    return response.status(400)
  .json({ message: 'Some required fields are missing' });
  }
  if (result.status === 401) {
    return response.status(401)
  .json({ message: 'Unauthorized user' });
  }
  return response.status(result.status).json(result.message);
};

module.exports = {
  createPostController,
  getByIdPostController,
  getAllPostController,
  updatePostController,
};