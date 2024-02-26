// Import required modules
const path = require('path');
const morgan = require('morgan'); // Morgan module for HTTP request logging
const { createStream } = require('rotating-file-stream'); // Module for rotating file streams
const chalkLogger = require('chalk'); // Chalk module for colored console logs

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
	});
};

let logStream = createLogStream(); // Initialize logStream outside the middleware (lazy initialization)

// Middleware function using Morgan for logging
const loggerFunction = morgan((tokens: any, req: any, res: any) => {
	const timestamp = tokens.date(req, res, 'web'); // Get formatted timestamp
	const method = tokens.method(req, res); // Get request method (GET, POST, etc.)
	const url = tokens.url(req, res); // Get request URL
	const status = tokens.status(req, res); // Get response status code
	const responseTime = tokens['response-time'](req, res); // Get response time in milliseconds

	// Retrieve error message from res.locals if available
	const errorMessage = res.locals.errorMessage ? `\nError: ${res.locals.errorMessage}` : '';

	// Construct the log message with relevant details
	const logMessage = `Timestamp: ${timestamp} | Method: ${method} | URL: ${url} | Status: ${status} | Response Time: ${responseTime} ms ${errorMessage}`;

	// Conditionally log to file for error responses (status code >= 400)
	if (res.statusCode >= 400) {
		// if (!logStream) {
		// 	logStream = createLogStream(); // Create the log stream only when needed
		// }
		logStream.write(logMessage + errorMessage + '\n'); // Write log message to file

		return console.log(`${chalkLogger.redBright.bold(logMessage)}`); // Log error message to console in red
	} else {
		return console.log(chalkLogger.greenBright.bold(logMessage)); // Log success message to console in green
	}
});

module.exports = loggerFunction; // Export the logger middleware for use in other modules
