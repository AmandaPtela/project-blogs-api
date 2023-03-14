const Joi = require('joi');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');

const createPostService = async (post) => {
  const { categoryIds } = post; 
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
    const resultPost2 = async () => { await BlogPost.create(post); };
    // const resultPost2 = await BlogPost.findOne({ where: { content } });
  return ({ status: 201, message: resultPost2 });
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

const updatePostService = async (postId, changes) => {
  const { title, content } = changes;
  const changeContent = content;
  const changeTitle = title;
  const schema = Joi.object({ title: Joi.string().min(1)
    .required().label('title'),
    content: Joi.string()
    .required().label('content'),
  });
const arraySchema = Joi.array().items(schema);
const { error } = arraySchema.validate([changes]);
if (error) return { status: 400, message: 'Some required fields are missing' };
  const result = await BlogPost.findOne({ where: { id: postId } });
  await BlogPost.update(result, {
    where: { title: changeTitle, content: changeContent },
  });
  const update = await BlogPost.findOne({ where: { title: changeTitle } });
  return ({ status: 200, message: update });
};

module.exports = {
  createPostService,
  getByIdPostService,
  getAllPostService,
  updatePostService,
};