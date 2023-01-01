// Importing
const { response } = require('express');
const express = require('express');
const router = express.Router();
const task = require('../models/taskModel');

// Getting All Tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await task.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Task
router.get('/:id', async (req, res) => {
    const getGroup = await task.findById({ _id: id });
});

// Creating One Task
router.post('/', async (req, res) => {
    const Task = new task({
        title: req.body.title,
        taskCreationDate: Date.now(),
        taskModificationDate: Date.now(),
        // Assignor:  Find id by emails given as input in frontend,
        // Assignee: Find id by emails given as input in frontend,
        // groupId: find id by group name,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Group
router.patch('/:id', async (req, res) => {
    const updatedGroup = await task.where({ _id: id }).update({
        $set: {
            groupName: req.body.name,
            //set emails in group
            groupModificationDate: Date.now(),
        },
    });
    try {
        const upd = await task.save();
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
router.delete('/:id', async (req, res) => {
    try {
        await task.deleteOne({ _id: id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
