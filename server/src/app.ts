// const express = require('express');
import express from 'express'; // Import the 'express' package
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const logger = require('./utilities/logger');
const apiRouter = require('./routes/api');
const cors = require('./middleware/cors.middleware');
const app = express();

dotenv.config();

app.use(logger);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

module.exports = app;
