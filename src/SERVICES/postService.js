const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');

const createPostService = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const postValues = Object.values(post);
  if (postValues.map((i) => i.length).includes(0)) { return ({ status: 400, erro: '1' }); }

  // Busca na tabela de CATEGORY e valida pelos ids a existência da categoria
  const findId = await Category.findAll({ where: { id: categoryIds } });
  if (findId.length !== categoryIds.length) {
    return ({ status: 400, message: 'one or more "categoryIds" not found' });
    }
  // Joga os dados do post na tabela BLOGPOST  
  await BlogPost.create({ title, content, userId });
  
  // Busca o post criado na tabela de POSTS e pega o Id dele
  const postId = await BlogPost.findOne({ where: { title },
    attributes: { exclude: title, content, userId } });
  const { id } = postId.dataValues;
  // Insere o ID e CATEGORIAS do post na tabela POSTCATEGORY
  categoryIds.forEach((i) => PostCategory.create({ postId: id, categoryId: i }));
  
  // Busca na tabela de POSTS e retorna completamente criado
  const dados = await BlogPost.findOne({ where: { title } });
  return { status: 201, message: dados };
};
 const getByIdPostService = async (id) => {
  const result = await BlogPost.findOne({
    where: { userId: id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
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
         through: { attributes: { exclude: ['postId', 'categoryId'] } },
      },
    ],
  });
  return ({ status: 200, message: result });
};

const updatePostService = async (user, postId, changes) => {
  const { title, content } = changes;
  const changeContent = content;
  const changeTitle = title;
  const changesValues = Object.values(changes).map((i) => i.length === 0);
  const userValidation = await BlogPost.findOne({ where: { userId: user } });

  if (!userValidation) return { status: 401, message: 'Unauthorized' };
  if (changesValues.includes(true)) { return { status: 400 }; }
  const result = await BlogPost.findOne({ where: { id: postId } });
  await result.update({ title: changeTitle, content: changeContent });
  const update = await BlogPost.findOne({ where: { title: changeTitle },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
     }],
  });
  return ({ status: 200, message: update });
};

module.exports = {
  createPostService,
  getByIdPostService,
  getAllPostService,
  updatePostService,
};