const { response } = require('express');
const express = require('express');
const { createScanner } = require('typescript');
const login = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

login.post('/', (req, res) => {
    console.log('received login request');
    const userLoggingIn = req.body;
    User.findOne({ username: userLoggingIn.username })
        .exec()
        .then((user) => {
            if (!user) {
                return res.json({ message: 'Invalid username or password' });
            }
            bcrypt
                .compare(userLoggingIn.password, user.password)
                .then((isCorrect) => {
                    if (isCorrect) {
                        const payload = {
                            id: user._id,
                            username: user.username,
                        };

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 172800 },
                            (err, token) => {
                                if (err) {
                                    return res.json({ message: err.message });
                                }
                                return res.json({
                                    message: 'Success',
                                    token: 'Bearer' + token,
                                });
                            }
                        );
                    } else {
                        return res.json({
                            message: 'Invalid Username or Password',
                        });
                    }
                });
        });
});

module.exports = login;
