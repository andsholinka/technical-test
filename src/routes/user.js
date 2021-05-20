const Router = require('express').Router();
const User = require('../controllers/user');
const Auth = require('../middleware/auth');

Router.get('/user', Auth, User.getDataUser)
    .get('/allusers', Auth, User.getAllDataUsers)
    .put('/user/:username', Auth, User.updateDataUser)
    .delete('/user/:username', Auth, User.deleteUserByUsername);

module.exports = Router;