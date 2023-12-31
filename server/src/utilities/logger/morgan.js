// Import required modules
const fs = require('fs'); // File system module for file operations
const path = require('path'); // Path module for working with file paths
const morgan = require('morgan'); // Morgan module for HTTP request logging
const { createStream } = require('rotating-file-stream'); // Module for rotating file streams
const chalk = require('chalk'); // Module for colorful console output

let hasLogs = false; // Flag to track if any logs have been written

// Function to get the log file name based on the current date
const getLogFileName = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
	const day = String(now.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}-access.log`; // Construct the file name with date format
};

// Function to create a log stream with appropriate settings
const createLogStream = () => {
	return createStream(getLogFileName(), {
		path: path.join(__dirname, '../../logs'),
		encoding: 'utf8',
		options: { initialRotation: 'append' }, // Open in append mode
	});
};

let logStream = null; // Initialize logStream outside the middleware (lazy initialization)

// Middleware function using Morgan for logging
const logger = morgan((tokens, req, res) => {
	const timestamp = tokens.date(req, res, 'web'); // Get formatted timestamp
	const method = tokens.method(req, res); // Get request method (GET, POST, etc.)
	const url = tokens.url(req, res); // Get request URL
	const status = tokens.status(req, res); // Get response status code
	const responseTime = tokens['response-time'](req, res); // Get response time in milliseconds

	// Retrieve error message from res.locals if available
	const errorMessage = res.locals.errorMessage ? `\nError: ${res.locals.errorMessage}` : '';

	// Construct the log message with relevant details
	const logMessage = `Timestamp: ${timestamp} | Method: ${method} | URL: ${url} | Status: ${status} | Response Time: ${responseTime} ms`;

	// Conditionally log to file for error responses (status code >= 400)
	if (res.statusCode >= 400) {
		if (!logStream) {
			logStream = createLogStream(); // Create the log stream only when needed
		}
		logStream.write(logMessage + errorMessage + '\n'); // Write log message to file
		hasLogs = true; // Set flag indicating logs have been written
		return console.log(chalk.redBright.bold(logMessage)); // Log error message to console in red
	} else {
		return console.log(chalk.greenBright.bold(logMessage)); // Log success message to console in green
	}
});

module.exports = logger; // Export the logger middleware for use in other modules
