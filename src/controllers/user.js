require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {

    async getDataUser(req, res, next) {

        const id = req.user.id;
        try {
            const user = await User.findById(id);
            if (user && user.length !== 0) {
                res.status(200).json({
                    status: res.statusCode,
                    data: user
                })
            } else {
                res.status(400).json({
                    status: res.statusCode,
                    message: 'Users was not found'
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }

    async getAllDataUsers(req, res, next) {

        const role = req.user.role;
        try {
            if (role == '0') {
                const user = await User.find({});
                if (user && user.length !== 0) {
                    res.status(200).json({
                        status: res.statusCode,
                        data: user
                    })
                } else {
                    res.status(400).json({
                        status: res.statusCode,
                        message: 'Users not found'
                    });
                }
            } else {
                res.status(401).send({
                    status: res.statusCode,
                    message: "this role not allowed to access this endpoint",
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }

    async updateDataUser(req, res, next) {

        const role = req.user.role;
        const data = req.params.username;
        try {
            if (role == '0') {
                const {
                    username,
                    password
                } = req.body;

                const user = await User.findOne({
                    username: data
                });
                if (user) {
                    let saltRounds = 10;
                    const hashedPw = await bcrypt.hash(password, saltRounds);
                    user.username = username;
                    user.password = hashedPw;

                    const updateDatauser = await user.save()

                    res.status(200).json({
                        status: res.statusCode,
                        data: updateDatauser
                    })
                } else {
                    res.status(400).json({
                        status: res.statusCode,
                        message: `User with Username = ${data} was not found!`
                    })
                }
            } else {
                res.status(401).send({
                    status: res.statusCode,
                    message: "this role not allowed to access this endpoint",
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }

    async deleteUserByUsername(req, res, next) {

        const role = req.user.role;
        try {
            if (role == '0') {
                User.findOneAndDelete({
                        username: req.params.username
                    })
                    .then(data => {
                        if (!data) {
                            res.status(400).send({
                                status: res.statusCode,
                                message: `User with Username = ${req.params.username} was not found!`
                            });
                        } else {
                            res.send({
                                status: res.statusCode,
                                message: `User with Username = ${req.params.username} was deleted successfully!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: res.statusCode,
                            message: "Could not delete User with Username = " + req.params.username
                        });
                    });
            } else {
                res.status(401).send({
                    status: res.statusCode,
                    message: "this role not allowed to access this endpoint",
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}

module.exports = new UserController();