// Import required services and modules for user management
const usersService = require('../services/users.service');
const tokenService = require('../utilities/token'); // Token generation and validation
const userValidationService = require('../models/validation/joi/user.validation'); // Validation of user data
const hashService = require('../utilities/bcrypt'); // Hashing and comparison of passwords
const normalizeUserFunction = require('../models/mongoDB/helpers/normalize_user'); // Data normalization for user input
import handleError from '../middleware/errorHandler.middleware';

// Function to register a new user
const registerUserController = async (req: any, res: any) => {
	try {
		// Normalize user data from the request
		let normalizedUser = await normalizeUserFunction(req.body);

		// Validate and register the user
		await userValidationService.registerUserValidation(normalizedUser);
		normalizedUser.password = await hashService.generateHash(normalizedUser.password);
		const dataFromDB = await usersService.registerUser(normalizedUser);

		// Respond with the registered user's data
		res.json(dataFromDB);
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 404);
	}
};

// Function to log in a user
const loginUserController = async (req: any, res: any) => {
	try {
		// Validate the user's login credentials
		await userValidationService.loginUserValidation(req.body);
		let { email, password } = req.body;
		let dataFromDB = await usersService.getUserByEmail(email);

		// Check if the login credentials are valid
		if (!dataFromDB || !(await hashService.cmpHash(password, dataFromDB.password))) {
			usersService;
			throw new Error('Invalid email or password');
		} else {
			// Generate a token for the authenticated user and send a success response
			let token = await tokenService.generateToken({
				isAdmin: dataFromDB.isAdmin,
				isBiz: dataFromDB.isBiz,
				_id: dataFromDB._id,
			});
			res.json({ msg: 'Login Successful!', token });
		}
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 404);
	}
};

// Function to get all users
const getAllUsersController = async (req: any, res: any) => {
	try {
		// Retrieve and respond with all users' data
		const dataFromDB = await usersService.getAllUsers();
		res.json(dataFromDB);
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 400);
	}
};

// Function to get a specific user by their ID
const getUserController = async (req: any, res: any) => {
	try {
		// Validate the user ID and retrieve the user's data
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDB = await usersService.getUserById(req.params.id);

		// Respond with the user's data or an error message if the user is not found
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 'Undefined user', 404);
		}
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 400);
	}
};

// Function to edit a user's data
const editUserController = async (req: any, res: any) => {
	try {
		// Normalize the user data from the request and validate the user ID and data
		let normalUser = await normalizeUserFunction(req.body);
		await userValidationService.userIdValidation(req.params.id);
		await userValidationService.updateUserValidation(normalUser);

		// Update the user's data and respond with the modified data
		const dataFromDB = await usersService.updateUser(req.params.id, normalUser);

		// Respond with the user's updated data or an error message if the user is not found
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 'Undefined user', 404);
		}
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 400);
	}
};

// Function to change a user's account status to a business account
const changeAccountTypeController = async (req: any, res: any) => {
	try {
		const id = req.params.id;

		// Validate the user ID and update the user's account status
		await userValidationService.userIdValidation(id);
		await usersService.updateBizUser(id);

		// Respond with a success message
		res.json({ msg: 'done' });
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 400);
	}
};

// Function to delete a user by their ID
const deleteUserController = async (req: any, res: any) => {
	try {
		// Validate the user ID and delete the user
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDb = await usersService.deleteUser(req.params.id);

		// Respond with a success message or an error message if the user is not found
		res.json({
			msg: `user - ${dataFromDb.name.first} ${dataFromDb.name.last} deleted`,
		});
	} catch (error: any) {
		// Handle errors, if any, by sending an error response
		handleError(res, error.message, 400);
	}
};

// Export all these functions for use in other parts of the application
// module.exports = {
// 	registerUserController,
// 	loginUserController,
// 	getAllUsersController,
// 	getUserController,
// 	editUserController,
// 	changeAccountTypeController,
// 	deleteUserController,
// };

export {
	registerUserController,
	loginUserController,
	getAllUsersController,
	getUserController,
	editUserController,
	changeAccountTypeController,
	deleteUserController,
};
