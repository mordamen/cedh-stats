// errorHandler.js
const errorHandler = (res: any, message = 'Internal Server Error', status: any) => {
	res.locals.errorMessage = message;

	// console.log('🚀 ~ handleError ~ status:', status);

	// console.log('🚀 ~ handleError ~ status:', res.status(status).json({ error: message, status: status }));

	// if (status >= 400) {
	// 	console.log(`error Handler: ${chalk.redBright.bold(message)}`);
	// } else {
	// 	console.log(`error Handler: ${chalk.greenBright.bold(message)}`);
	// }

	return res.status(status).json({ error: message, status: status });
};

// module.exports = errorHandler;
export default errorHandler;
