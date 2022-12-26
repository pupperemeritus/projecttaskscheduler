// Importing
const mongoose = require('mongoose');

// Creating schemas
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    taskDescription: {
        type: String,
        required: false,
    },

    groupId: {
        type: ObjectId,
        required: false,
    },

    assignee: {
        type: ObjectId,
        required: true,
    },

    assignor: {
        type: ObjectId,
        required: true,
    },

    taskModificationDate: {
        type: Date,
        required: false,
    },

    taskCreationDate: {
        type: Date,
        required: true,
    },

    taskEndingDate: {
        type: Date,
        required: true,
    },
});
// Schemas End

module.export = mongoose.model('Task', taskSchema);
