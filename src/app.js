const express = require('express');
const userController = require('./CONTROLLERS/userController');
const postController = require('./CONTROLLERS/postController');
const categoryController = require('./CONTROLLERS/categoryController');
const validateToken = require('./Middlewares/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.post('/login', userController.loginController);

app.get('/user', validateToken, userController.getAllUsersController);

app.get('/user/:id', validateToken, userController.getUserByIdController);

app.post('/user', userController.createUserController);

app.post('/categories', validateToken, categoryController.createCategoryController);

app.get('/categories', validateToken, categoryController.getAllCategoriesService);

app.post('/post', validateToken, postController.createPostController);

app.get('/post', validateToken, postController.getAllPostController);

// app.get('/post/:id', validateToken, postController.getByIdPostController);

module.exports = app;
