const morganLogger = require('../utilities/logger/morgan');
const config = require('config');

const loggerOption = config.get('loggerOption');

const loggerService = () => {
	switch (loggerOption) {
		case 'morgan':
		default:
			return morganLogger;
	}
};

module.exports = loggerService;
