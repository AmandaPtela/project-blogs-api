const Joi = require('joi');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');

const createPostService = async (post) => {
  const { categoryIds, title } = post; 
    const schema = Joi.object({ title: Joi.string().min(1)
      .required().label('title'),
      content: Joi.string()
      .required().label('content'),
      categoryIds: Joi.array().required().label('categoryIds'),
    });
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([post]);
  if (error) return ({ status: 400, message: error.message });
  const findId = await Category.findAll({ where: { id: categoryIds } });
  if (findId.length !== categoryIds.length) {
 return ({
    status: 400, message: 'one or more "categoryIds" not found' }); 
  }
  await BlogPost.create(post);
  const resultPost = await BlogPost.findOne({ where: { title } });
  return ({ status: 201, message: resultPost });
};

 const getByIdPostService = async (id) => {
  const result = await BlogPost.findOne({
    where: { userId: id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
         as: 'categories',
         attributes: { exclude: 'PostCategory' },
      },
    ],
  });
  if (!result) {
    return { status: 404, message: 'Post does not exist' };
  }
  console.log(result);
  // const a = await BlogPost.findByPk(id);
  return ({ status: 200, message: result });
};

const getAllPostService = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
         as: 'categories',
         attributes: { exclude: 'PostCategory' },
      },
    ],
  });
  console.log(result);
  return ({ status: 200, message: result });
};

module.exports = {
  createPostService,
  getByIdPostService,
  getAllPostService,
};