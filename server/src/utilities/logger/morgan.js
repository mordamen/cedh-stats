// logger.js
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const { createStream } = require('rotating-file-stream');
const chalk = require('chalk');

// Function to get the log file name based on the current date
const getLogFileName = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}-access.log`;
};

// Create a rotating write stream for log files
const logStream = createStream(getLogFileName, {
	interval: '1d', // Rotate daily
	path: path.join(__dirname, '../../logs'), // Set the log files directory
});

const logger = morgan((tokens, req, res) => {
	const timestamp = tokens.date(req, res, 'web');
	const method = tokens.method(req, res);
	const url = tokens.url(req, res);
	const status = tokens.status(req, res);
	const responseTime = tokens['response-time'](req, res);

	// Get the error message from res.locals if it exists
	const errorMessage = res.locals.errorMessage
		? `\nError: ${res.locals.errorMessage}`
		: '';

	// Construct the log message
	const logMessage = `Timestamp: ${timestamp} | Method: ${method} | URL: ${url} | Status: ${status} | Response Time: ${responseTime} ms`;

	if (res.statusCode >= 400) {
		// Write the log message to the file stream
		logStream.write(logMessage + errorMessage + '\n');

		return console.log(chalk.redBright.bold(logMessage));
	} else {
		return console.log(chalk.greenBright.bold(logMessage));
	}
});

module.exports = logger;
