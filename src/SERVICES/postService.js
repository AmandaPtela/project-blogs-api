const Joi = require('joi');
const { BlogPost } = require('../models');

const createPostService = async (post) => {
    const schema = Joi.object({ title: Joi.string().min(1)
      .required().label('title'),
      content: Joi.string()
      .required().label('content'),
      categoryIds: Joi.array().required().label('categoryIds'),
    });
  
  const arraySchema = Joi.array().items(schema);
  const { error } = arraySchema.validate([post])
  
  console.log(error);
  if (error) return ({ status: 400, message: error.message });

  const createUser = async () => await BlogPost.create(post);
  return ({ status: 201, message: createUser });
};

module.exports = { createPostService };