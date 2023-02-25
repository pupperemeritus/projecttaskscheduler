const { response } = require('express');
const express = require('express');
const register = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

register.post('/', async (req, res) => {
    console.log('received register request');
    const takenUsername = false;
    const takenEmail = false;
    try {
        const takenUsername = await User.findOne({
            username: user.username,
        }).exec();
        const takenEmail = await User.findOne({ email: user.email }).exec();
    } catch (err) {
        console.log('failed to verify uniqueness of username and email');
        res.json({ message: err.message });
    }
    if (takenUsername || takenEmail) {
        return res.json({
            message: 'Username or Email has already been taken',
        });
    } else {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        user.password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User(
            {
                name: user.name.toLowerCase(),
                email: user.email.toLowerCase(),
                password: user.password,
                accountCreationDate: Date.now(),
                accountModificationDate: Date.now(),
            },
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        try {
            newUser.save();
            return res.status(200);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
});

module.exports = register;
