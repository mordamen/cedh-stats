const JoiLogin = require('joi');

const LoginSchema = JoiLogin.object({
	email: JoiLogin.string()
		.regex(new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/))
		.required(),
	password: JoiLogin.string()
		.regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
		.required(),
});

const validateLoginSchema = (userInput: any) => LoginSchema.validateAsync(userInput);

module.exports = {
	validateLoginSchema,
};
