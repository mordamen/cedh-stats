const Joi = require('joi');

const createCardSchema = Joi.object({
	title: Joi.string().min(2).max(256).required().messages({
		'string.base': `Title should be a string`,
		'string.empty': `Title cannot be empty`,
		'string.min': `Title should have a minimum length of {#limit}`,
		'string.max': `Title should have a maximum length of {#limit}`,
		'any.required': `Title is required`,
	}),
	subTitle: Joi.string().min(2).max(256).required().messages({
		'string.base': `Subtitle should be a string`,
		'string.empty': `Subtitle cannot be empty`,
		'string.min': `Subtitle should have a minimum length of {#limit}`,
		'string.max': `Subtitle should have a maximum length of {#limit}`,
		'any.required': `Subtitle is required`,
	}),
	description: Joi.string().min(2).max(1024).required().messages({
		'string.base': `Description should be a string`,
		'string.empty': `Description cannot be empty`,
		'string.min': `Description should have a minimum length of {#limit}`,
		'string.max': `Description should have a maximum length of {#limit}`,
		'any.required': `Description is required`,
	}),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.min(2)
		.max(1024)
		.required()
		.messages({
			'string.base': `Email should be a string`,
			'string.empty': `Email cannot be empty`,
			'string.email': `Invalid email format`,
			'string.min': `Email should have a minimum length of {#limit}`,
			'string.max': `Email should have a maximum length of {#limit}`,
			'any.required': `Email is required`,
		}),
	phone: Joi.string()
		.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
		.required()
		.messages({
			'string.base': `Phone should be a string`,
			'string.empty': `Phone cannot be empty`,
			'string.pattern.base': `Invalid phone number format`,
			'any.required': `Phone is required`,
		}),
	web: Joi.string()
		.regex(
			/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
		)
		.allow('')
		.messages({
			'string.base': `Web should be a string`,
			'string.empty': `Web cannot be empty`,
			'string.pattern.base': `Invalid web URL format`,
		}),
	image: Joi.object().keys({
		url: Joi.string()
			.regex(
				/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
			)
			.messages({
				'string.base': `Image URL should be a string`,
				'string.empty': `Image URL cannot be empty`,
				'string.pattern.base': `Invalid image URL format`,
			}),
		alt: Joi.string().min(2).max(256).required().messages({
			'string.base': `Alt should be a string`,
			'string.empty': `Alt cannot be empty`,
			'string.min': `Alt should have a minimum length of {#limit}`,
			'string.max': `Alt should have a maximum length of {#limit}`,
			'any.required': `Alt is required`,
		}),
	}),
	address: Joi.object().keys({
		state: Joi.string().min(0).max(256),
		country: Joi.string().min(2).max(256).required().messages({
			'string.base': `Country should be a string`,
			'string.empty': `Country cannot be empty`,
			'string.min': `Country should have a minimum length of {#limit}`,
			'string.max': `Country should have a maximum length of {#limit}`,
			'any.required': `Country is required`,
		}),
		city: Joi.string().min(2).max(256).required().messages({
			'string.base': `City should be a string`,
			'string.empty': `City cannot be empty`,
			'string.min': `City should have a minimum length of {#limit}`,
			'string.max': `City should have a maximum length of {#limit}`,
			'any.required': `City is required`,
		}),
		street: Joi.string().min(2).max(256).required().messages({
			'string.base': `Street should be a string`,
			'string.empty': `Street cannot be empty`,
			'string.min': `Street should have a minimum length of {#limit}`,
			'string.max': `Street should have a maximum length of {#limit}`,
			'any.required': `Street is required`,
		}),
		houseNumber: Joi.number().min(1).required().messages({
			'number.base': `House number should be a number`,
			'number.empty': `House number cannot be empty`,
			'number.min': `House number should be greater than or equal to {#limit}`,
			'any.required': `House number is required`,
		}),
		zip: Joi.number().min(0).allow('').messages({
			'number.base': `Zip code should be a number`,
			'number.empty': `Zip code cannot be empty`,
			'number.min': `Zip code should be greater than or equal to {#limit}`,
		}),
	}),
	bizNumber: Joi.number().min(0).max(9999999).required().messages({
		'number.base': `Business number should be a number`,
		'number.empty': `Business number cannot be empty`,
		'number.min': `Business number should be greater than or equal to {#limit}`,
		'number.max': `Business number should be less than or equal to {#limit}`,
		'any.required': `Business number is required`,
	}),
	user_id: Joi.string().hex().length(24).messages({
		'string.base': `User ID should be a string`,
		'string.empty': `User ID cannot be empty`,
		'string.length': `User ID should have a length of {#limit}`,
		'string.hex': `User ID should be a hexadecimal value`,
		'any.required': `User ID is required`,
	}),
});

const validateCardSchema = (userInput) => {
	return createCardSchema.validateAsync(userInput);
};

module.exports = {
	validateCardSchema,
};
