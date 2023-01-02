const { response } = require('express');
const express = require('express');
const { createScanner } = require('typescript');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

router.post('/', async (req, res) => {
    const user = req.body;

    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
        return res.json({
            message: 'Username or Email has already been taken',
        });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
        });
        try {
            user.save();
            return res.json.status(200);
        } catch (err) {
            return res.json.status(500).json({ message: err.message });
        }
    }
});

module.exports = router;
