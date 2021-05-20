require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let refreshTokens = []

class AuthController {

    async register(req, res, next) {

        try {
            const {
                username,
                password,
                isVerified,
                role,
            } = req.body;

            const saltRounds = 10;
            const hashedPw = await bcrypt.hash(password, saltRounds);

            const usernameDuplicate = await User.findOne({
                "username": username
            })

            if (usernameDuplicate) {
                res.status(400).json({
                    status: res.statusCode,
                    message: 'This Username Already Registered'
                });
            } else {
                User.create({
                    username: username,
                    password: hashedPw,
                    role: role,
                    isVerified: isVerified,
                })
                res.status(201).json({
                    status: res.statusCode,
                    message: 'Success Registration, Please Login'
                });
            }
        } catch (e) {
            next(e.detail);
        }
    }

    async login(req, res, next) {

        try {
            const {
                username,
                password
            } = req.body;

            const currentUser = await new Promise((resolve, reject) => {
                User.find({
                    "username": username
                }, function (err, cust) {
                    if (err)
                        reject(err)
                    resolve(cust)
                })
            })

            //cek apakah ada user?
            if (currentUser[0]) {
                //check password
                bcrypt.compare(password, currentUser[0].password).then(function (result) {
                    if (result) {
                        const result = currentUser[0];
                        const id = result.id;
                        const isVerified = result.isVerified;
                        const role = result.role;
                        //urus token disini
                        let accessToken = jwt.sign({
                            id: id,
                            isVerified: isVerified,
                            role: role
                        }, process.env.SECRET, {
                            expiresIn: '1m'
                        });
                        let refreshToken = jwt.sign({
                            id: id,
                            isVerified: isVerified,
                            role: role
                        }, process.env.SECRET2, {
                            expiresIn: 604800
                        });
                        refreshTokens.push(refreshToken);
                        res.cookie('jwt', accessToken, {
                            httpOnly: true,
                            maxAge: -1
                        });
                        res.status(200).json({
                            status: res.statusCode,
                            accessToken,
                            refreshToken
                        });
                    } else {
                        res.status(400).json({
                            status: res.statusCode,
                            message: "wrong password."
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: res.statusCode,
                    message: `User with Username = ${req.body.username} was not found!`
                });
            }
        } catch (e) {
            next(e.detail);
        }
    }

    async renewAccessToken(req, res, next) {

        const refreshToken = req.body.token;
        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
            return res.status(403).json({
                status: res.statusCode,
                message: "failed not authenticated"
            });
        }
        jwt.verify(refreshToken, process.env.SECRET2, async function (err, decoded) {
            let result = decoded
            const id = result.id;
            const isVerified = result.isVerified;
            const role = result.role;
            if (!err) {
                const accessToken = jwt.sign({
                    id: id,
                    isVerified: isVerified,
                    role: role
                }, process.env.SECRET, {
                    expiresIn: 604800
                });
                return res.status(201).json({
                    status: res.statusCode,
                    accessToken
                });
            } else {
                return res.status(403).json({
                    status: res.statusCode,
                    message: "User not authenticated"
                });
            }
        })
    }

    async logout(req, res, next) {
        res.clearCookie('jwt');
        res.status(200).json({
            message: 'Cookie cleared'
        });
    }
}

module.exports = new AuthController();