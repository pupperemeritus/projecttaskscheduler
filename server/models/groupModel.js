// Importing
const mongoose = require('mongoose');

// Creating schemas
const groupSchema = new mongoose.Schema({
    ids: {
        type: [ObjectId],
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

module.export = mongoose.model('Group', groupSchema);
