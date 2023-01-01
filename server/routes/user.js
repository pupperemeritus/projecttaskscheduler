// Importing
const { response } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../models/userModel');

// Getting All Users
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One User
router.get('/:id', async (req, res) => {
    const getUser = await user.findById({ _id: id });
});

// Creating One User
router.post('/', async (req, res) => {
    const user = new user({
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
router.patch('/:id', async (req, res) => {
    const updatedUser = await user.where({ _id: id }).update({
        $set: {
            name: req.body.name,
            email: req.body.email,
            accountModificationDate: Date.now(),
        },
    });
    try {
        const upd = await user.save();
        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
router.delete('/:id', async (req, res) => {
    try {
        await user.deleteOne({ _id: id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
