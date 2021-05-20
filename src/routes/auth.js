const Router = require('express').Router();
const User = require('../controllers/auth');

Router.post('/register', User.register)
    .post('/login', User.login)
    .post('/renewAccessToken', User.renewAccessToken)
    .delete('/logout', User.logout);

module.exports = Router;