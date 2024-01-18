const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger.middleware');
const apiRouter = require('./routes/api');
const cors = require('./middleware/cors.middleware');
const app = express();

app.use(logger());
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

module.exports = app;
