// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const groupRouter = require('./routes/group');
const taskRouter = require('./routes/task');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

require('dotenv').config();
// Imports End

// Express Initialization
const app = express();
// Express Initialization End

// Middleware Initialization
app.use(express.json());
app.use('/group', groupRouter);
app.use('/task', taskRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
