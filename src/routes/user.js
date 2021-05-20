const Router = require('express').Router();
const User = require('../controllers/user');
const Auth = require('../middleware/auth');

Router.get('/user', Auth, User.getDataUser)
    .get('/user/all', Auth, User.getAllDataUsers)
    .put('/user/:username', Auth, User.updateDataUser)
    .delete('/user/:username', Auth, User.deleteUserByUsername);

module.exports = Router;