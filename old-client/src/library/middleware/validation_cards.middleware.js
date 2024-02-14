const joiCardValidation = require('../models/validation/joi/cards.validation');
const config = require('config');

const validatorOption = config.get('validatorOption');

const createCardValidation = (userInput) => {
	switch (validatorOption) {
		case 'joi':
			return joiCardValidation.validateCardSchema(userInput);
	}
	throw new Error('validator undefind');
};

const cardIdValidation = (idToCheck) => {
	switch (validatorOption) {
		case 'joi':
			return joiCardValidation.validateIdSchema(idToCheck);
	}
	throw new Error('validator undefind');
};

module.exports = {
	createCardValidation,
	cardIdValidation,
};
