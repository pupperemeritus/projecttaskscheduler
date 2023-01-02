// Importing
const mongoose = require('mongoose');

// Creating schemas
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    accountModificationDate: {
        type: Date,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    accountCreationDate: {
        type: Date,
        required: true,
    },
});
// Schemas End

module.export = mongoose.model('User', userSchema);
