const JoiUsers = require('joi');

const userSchema = JoiUsers.object({
	name: JoiUsers.object()
		.keys({
			first: JoiUsers.string().min(2).max(256).required().messages({
				'string.base': `First name should be a string`,
				'string.empty': `First name cannot be empty`,
				'string.min': `First name should have a minimum length of {#limit}`,
				'string.max': `First name should have a maximum length of {#limit}`,
				'any.required': `First name is required`,
			}),
			middle: JoiUsers.string().min(2).max(256).allow('').messages({
				'string.base': `Middle name should be a string`,
				'string.min': `Middle name should have a minimum length of {#limit}`,
				'string.max': `Middle name should have a maximum length of {#limit}`,
			}),
			last: JoiUsers.string().min(2).max(256).required().messages({
				'string.base': `Last name should be a string`,
				'string.empty': `Last name cannot be empty`,
				'string.min': `Last name should have a minimum length of {#limit}`,
				'string.max': `Last name should have a maximum length of {#limit}`,
				'any.required': `Last name is required`,
			}),
		})
		.required(),
	phone: JoiUsers.string()
		.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
		.required()
		.messages({
			'string.base': `Phone should be a string`,
			'string.empty': `Phone cannot be empty`,
			'string.pattern.base': `Invalid phone number format`,
			'any.required': `Phone is required`,
		}),
	email: JoiUsers.string()
		.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
		.required()
		.messages({
			'string.base': `Email should be a string`,
			'string.empty': `Email cannot be empty`,
			'string.pattern.base': `Invalid email format`,
			'any.required': `Email is required`,
		}),
	password: JoiUsers.string()
		.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.required()
		.messages({
			'string.base': `Password should be a string`,
			'string.empty': `Password cannot be empty`,
			'string.pattern.base': `Invalid password format`,
			'any.required': `Password is required`,
		}),
	image: JoiUsers.object().keys({
		url: JoiUsers.string()
			.regex(
				/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
			)
			.messages({
				'string.base': `Image URL should be a string`,
				'string.empty': `Image URL cannot be empty`,
				'string.pattern.base': `Invalid image URL format`,
			}),
		alt: JoiUsers.string().min(2).max(256).required().messages({
			'string.base': `Alt should be a string`,
			'string.empty': `Alt cannot be empty`,
			'string.min': `Alt should have a minimum length of {#limit}`,
			'string.max': `Alt should have a maximum length of {#limit}`,
			'any.required': `Alt is required`,
		}),
	}),
	address: JoiUsers.object()
		.keys({
			state: JoiUsers.string().min(2).max(256).allow('').messages({
				'string.base': `State should be a string`,
				'string.min': `State should have a minimum length of {#limit}`,
				'string.max': `State should have a maximum length of {#limit}`,
			}),
			country: JoiUsers.string().min(2).max(256).required().messages({
				'string.base': `Country should be a string`,
				'string.empty': `Country cannot be empty`,
				'string.min': `Country should have a minimum length of {#limit}`,
				'string.max': `Country should have a maximum length of {#limit}`,
				'any.required': `Country is required`,
			}),
			city: JoiUsers.string().min(2).max(256).required().messages({
				'string.base': `City should be a string`,
				'string.empty': `City cannot be empty`,
				'string.min': `City should have a minimum length of {#limit}`,
				'string.max': `City should have a maximum length of {#limit}`,
				'any.required': `City is required`,
			}),
			street: JoiUsers.string().min(2).max(256).required().messages({
				'string.base': `Street should be a string`,
				'string.empty': `Street cannot be empty`,
				'string.min': `Street should have a minimum length of {#limit}`,
				'string.max': `Street should have a maximum length of {#limit}`,
				'any.required': `Street is required`,
			}),
			houseNumber: JoiUsers.number().min(1).required().messages({
				'number.base': `House number should be a number`,
				'number.empty': `House number cannot be empty`,
				'number.min': `House number should be greater than or equal to {#limit}`,
				'any.required': `House number is required`,
			}),
			zip: JoiUsers.number().allow('', 0).messages({
				'number.base': `Zip code should be a number`,
				'number.empty': `Zip code cannot be empty`,
				'number.allow': `Zip code should be either a number or an empty string`,
			}),
		})
		.required(),
	isAdminAccount: JoiUsers.boolean().allow(''),
	isBusinessAccount: JoiUsers.boolean().required().messages({
		'any.required': `isBusinessAccount is required`,
	}),
});

const idSchema = JoiUsers.string().length(24).hex().required();

const validateIdSchema = (idToCheck: number) => {
	return idSchema.validateAsync(idToCheck);
};

const validateRegisterSchema = (userInput: any) => userSchema.validateAsync(userInput);

const validateUpdateUserSchema = (userInput: any) => userSchema.validateAsync(userInput);

module.exports = {
	validateRegisterSchema,
	validateIdSchema,
	validateUpdateUserSchema,
};
