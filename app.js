const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const addUserRoute = require('./routes/addUser');
const checkTrialRoute = require('./routes/checkTrial');
const allUserRoute = require('./routes/allUser');
const deleteUserRoute = require('./routes/deleteUser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(addUserRoute);
app.use(checkTrialRoute);
app.use(allUserRoute);
app.use(deleteUserRoute);

module.exports = app;
