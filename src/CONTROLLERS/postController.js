const postService = require('../SERVICES/postService');

const createPostController = async (request, response) => {
    const post = request.body;
    const result = await postService.createPostService(post);
    return response.status(result.status).json(result.message);
};
module.exports = {
  createPostController,
};