const joiUserValidation = require('../models/validation/joi/user.validation');
const joiloginValidation = require('../models/validation/joi/login.validation');
const config = require('config');

const validatorOption = config.get('validatorOption');

const registerUserValidation = (userInput) => {
	switch (validatorOption) {
		case 'joi':
		default:
			return joiUserValidation.validateRegisterSchema(userInput);
	}
	throw new Error('validator undefind');
};

const loginUserValidation = (userInput) => {
	switch (validatorOption) {
		case 'joi':
		default:
			return joiloginValidation.validateLoginSchema(userInput);
	}
	throw new Error('validator undefind');
};

const updateUserValidation = (userInput) => {
	switch (validatorOption) {
		case 'joi':
		default:
			return joiUserValidation.validateUpdateUserSchema(userInput);
	}
	throw new Error('validator undefind');
};

const userIdValidation = (userInput) => {
	switch (validatorOption) {
		case 'joi':
		default:
			return joiuserIdValidation.validateIdSchema(userInput);
	}
	throw new Error('validator undefind');
};

module.exports = {
	registerUserValidation,
	loginUserValidation,
	userIdValidation,
	updateUserValidation,
};
