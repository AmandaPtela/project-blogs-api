const express = require('express');
const userController = require('./CONTROLLERS/userController');
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

module.exports = app;
