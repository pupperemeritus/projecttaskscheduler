// Importing
const { response } = require('express');
const express = require('express');
const { createScanner } = require('typescript');
const router = express.Router();
const Group = require('../models/groupModel');
const verifyJWT = require('../models/verifyJWT');

// Getting All Groups
router.get('/', verifyJWT, async (req, res) => {
    try {
        const groups = await Group.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Group
router.get('/:id', async (req, res) => {
    try {
        const getGroup = await Group.findById({ _id: id });
        res.status(201).json(getGroup);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Creating One Group
router.post('/', verifyJWT, async (req, res) => {
    const group = new group({
        groupName: req.body.groupName,
        groupCreationDate: Date.now(),
        groupModificationDate: Date.now(),
        emails: req.body.emails.split(','),
    });
    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Group
router.patch('/:id', verifyJWT, async (req, res) => {
    const updatedGroup = await Group.find()
        .where({ _id: id })
        .update({
            $set: {
                groupName: req.body.groupName,
                emails: req.body.emails.split(','),
                groupModificationDate: Date.now(),
            },
        });
    try {
        const upd = await updatedGroup.save();
        res.status(201).json(upd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        await Group.deleteOne({ _id: id });
        res.status(200);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
