const bcrypt = require('bcryptjs');

const generateHash = (password: string) => bcrypt.hash(password, 10);

const cmpHash = (password: string, hash: any) => bcrypt.compare(password, hash);

module.exports = {
	generateHash,
	cmpHash,
};
