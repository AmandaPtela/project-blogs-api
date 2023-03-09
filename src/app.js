const express = require('express');
const { loginController } = require('./CONTROLLERS/loginController');
const { userController } = require('./CONTROLLERS/userController');
const { allUsersController } = require('./CONTROLLERS/allUsersController');
const validateToken = require('./utils/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.post('/login', loginController);

app.get('/user', validateToken, allUsersController);

app.post('/user', userController);

module.exports = app;
