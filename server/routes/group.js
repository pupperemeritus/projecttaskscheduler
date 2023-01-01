// Importing
const { response } = require('express');
const express = require('express');
const router = express.Router();
const group = require('../models/groupModel');

// Getting All Groups
router.get('/', async (req, res) => {
    try {
        const groups = await group.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Group
router.get('/:id', async (req, res) => {
    const getGroup = await group.findById({ _id: id });
});

// Creating One Group
router.post('/', async (req, res) => {
    const group = new group({
        groupName: req.body.groupName,
        groupCreationDate: Date.now(),
        groupModificationDate: Date.now(),
        // Find by emails given as input in frontend,
    });
    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Group
router.patch('/:id', async (req, res) => {
    const updatedGroup = await group.where({ _id: id }).update({
        $set: {
            groupName: req.body.groupName,
            //set emails in group
            groupModificationDate: Date.now(),
        },
    });
    try {
        const upd = await group.save();
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
router.delete('/:id', async (req, res) => {
    try {
        await group.deleteOne({ _id: id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
