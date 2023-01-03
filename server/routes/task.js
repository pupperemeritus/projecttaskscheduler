// Importing
const { response } = require('express');
const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Group = require('../models/groupModel');
const verifyJWT = require('../models/verifyJWT');

// Getting All Tasks
router.get('/', verifyJWT, async (req, res) => {
    try {
        const tasks = await Task.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Task
router.get('/:id', verifyJWT, async (req, res) => {
    try {
        const getTask = await Task.findById({ _id: id });
        req.status(201).json(getTask);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Creating One Task
router.post('/', verifyJWT, async (req, res) => {
    if (req.body.groupName != null) {
        try {
            await Group.find({ groupName: req.body.groupName });
        } catch (err) {
            res.status(500).json({ message: err.message + 'Group Not Found' });
        }
    }
    const Task = new Task({
        title: req.body.title,
        taskCreationDate: Date.now(),
        taskModificationDate: Date.now(),
        taskDescription: req.body.taskDescription,
        groupName: req.body.groupName,
        taskEndingDate: req.body.taskEndingDate,
        assignor: req.body.assignor,
        assignee: req.body.assignee,
    });
    try {
        const newTask = await Task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Task
router.patch('/:id', verifyJWT, async (req, res) => {
    try {
        await Task.find({ groupName: req.body.groupName });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    const updatedTask = await Task.find()
        .where({ _id: id })
        .update({
            $set: {
                groupName: req.body.groupName,
                title: req.body.title,
                taskDescription: req.body.taskDescription,
                taskModificationDate: Date.now(),
                assignor: req.body.assignor,
                assignee: req.body.assignee,
                taskEndingDate: req.body.taskEndingDate,
            },
        });
    try {
        const upd = await updatedTask.save();
        res.status(201).json(upd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One User
router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        await Task.deleteOne({ _id: id });
        res.status(200);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
