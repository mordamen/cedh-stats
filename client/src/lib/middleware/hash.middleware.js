const config = require('config');
const bcryptjs = require('../utilities/hash/bcrypt');

const hashOption = config.get('hashOption');

const generateHash = (password) => {
	switch (hashOption) {
		case 'bcryptjs':
		default:
			return bcryptjs.generateHash(password);
	}
};

const cmpHash = (password, hash) => {
	switch (hashOption) {
		case 'bcryptjs':
		default:
			return bcryptjs.cmpHash(password, hash);
	}
};

module.exports = {
	generateHash,
	cmpHash,
};
