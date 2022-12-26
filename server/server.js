// Imports
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
require('dotenv').config();
// Imports End

// Express Initialization
const app = express();
// Express Initialization End

// Middleware Initialization
app.use(express.json());
app.use('/user', userRouter);
app.use('body-parser');
// Middleware Initialization End

// Mongoose Initialization
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
});
db.once('open', () => console.log('Connected'));
// Mongoose Initialization End

// Requests
app.get('/test', (req, res) => {
    res.json({ Hello: ['World'] });
});
// Requests End
