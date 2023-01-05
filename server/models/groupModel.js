// Importing
const mongoose = require('mongoose');

// Creating schemas
const groupSchema = new mongoose.Schema({
    emails: {
        type: [String],
        required: true,
    },

    groupName: {
        type: String,
        required: true,
    },

    groupCreationDate: {
        type: Date,
        required: true,
    },

    groupModifiedDate: {
        type: Date,
        required: true,
    },
});
// Schemas End

module.exports = mongoose.model('Group', groupSchema);
