// Importing
const { response } = require('express');
const express = require('express');
const { createScanner } = require('typescript');
const group = express.Router();
const Group = require('../models/groupModel');
const verifyJWT = require('../models/verifyJWT');

// Getting All Groups
group.get('/', verifyJWT, async (req, res) => {
    console.log('received getting all groups');
    try {
        const groups = await Group.find()
            .exec()
            .then(() => {
                res.status(201).json(groups);
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Group
group.get('/:id', async (req, res) => {
    console.log('received one group');
    try {
        const getGroup = await Group.findById({ _id: id });
        res.status(201).json(getGroup);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Creating One Group
group.post('/', verifyJWT, async (req, res) => {
    console.log('received creating one group');
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
group.patch('/:id', verifyJWT, async (req, res) => {
    console.log('received updating one group');
    const updatedGroup = await Group.find()
        .where({ _id: id })
        .update({
            $set: {
                groupName: req.body.groupName,
                emails: req.body.emails.split(','),
                groupModificationDate: Date.now(),
            },
        })
        .exec();
    try {
        const upd = await updatedGroup.save();
        res.status(201).json(upd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
group.delete('/:id', verifyJWT, async (req, res) => {
    console.log('received deleting one group');
    try {
        await Group.deleteOne({ _id: id })
            .exec()
            .then(() => res.status(201));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = group;
