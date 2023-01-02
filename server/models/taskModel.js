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

    groupName: {
        type: String,
        required: false,
    },

    assignee: {
        type: String,
        required: true,
    },

    assignor: {
        type: String,
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
