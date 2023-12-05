const chalk = require('chalk');

// errorHandler.js
const handleError = (res, status, message = 'Internal Server Error') => {
	res.locals.errorMessage = message;

	if (res.status(status) >= 400) {
		console.log(chalk.redBright.bold(message));
	} else {
		console.log(chalk.greenBright.bold(message));
	}

	return res.status(status).json({ error: message, status: status });
};

module.exports = handleError;
