// Importing
const { response } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Getting All Users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One User
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.name)
});

// Creating One User
router.post('/', async (req, res) => {
    const user = new userModel({
        name: req.body.name,
        accountCreationDate: Date.now(),
        accountModificationDate: Date.now(),
        email: req.body.email,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One User
router.patch('/:id', (getUser, req, res) => {});

// Deleting One User
router.delete('/:id', (getUser, req, res) => {});

// Login

//router.post();

// Register

//router.post();

// Middleware to process id
const getUser = async (req, res, next) => {
    let user;
    try {
        user = await user.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};

module.exports = router;
