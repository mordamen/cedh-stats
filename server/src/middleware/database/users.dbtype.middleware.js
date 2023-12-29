const config = require('config');
const usersServiceMongo = require('../../services/users.service');
const dbOption = config.get('dbOption');

const registerUser = (userData) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.registerUser(userData);
	}
};

const getUserByEmail = (email) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.getUserByEmail(email);
	}
};
const getUserById = (id) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.getUserById(id);
	}
};

const getAllUsers = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.getAllUsers();
	}
};

const updateUser = (id, userToUpdate) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.updateUser(id, userToUpdate);
	}
};

const updateBizUser = (id) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.updateBizUser(id);
	}
};

const deleteUser = (id) => {
	switch (dbOption) {
		case 'mongo':
		default:
			return usersServiceMongo.deleteUser(id);
	}
};

module.exports = {
	registerUser,
	getUserByEmail,
	getUserById,
	getAllUsers,
	updateUser,
	updateBizUser,
	deleteUser,
};
