// Import required services and modules for user management
const dbType = require('../middleware/database/users.dbtype.middleware'); // User-related data access and operations
const tokenService = require('../middleware/token.middleware'); // Token generation and validation
const userValidationService = require('../middleware/validation_users.middleware'); // Validation of user data
const hashService = require('../middleware/hash.middleware'); // Hashing and comparison of passwords
const normalizeUser = require('../models/mongoDB/helpers/normalize_user'); // Data normalization for user input
const handleError = require('../middleware/errorHandler.middleware'); // Middleware for handling errors

// Function to register a new user
const registerUser = async (req, res) => {
	try {
		// Normalize user data from the request
		let normalizedUser = await normalizeUser(req.body);

		// Validate and register the user
		await userValidationService.registerUserValidation(normalizedUser);
		normalizedUser.password = await hashService.generateHash(
			normalizedUser.password
		);
		const dataFromDB = await dbType.registerUser(normalizedUser);

		// Respond with the registered user's data
		res.json(dataFromDB);
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 404, error.message);
	}
};

// Function to log in a user
const loginUser = async (req, res) => {
	try {
		// Validate the user's login credentials
		await userValidationService.loginUserValidation(req.body);
		let { email, password } = req.body;
		let dataFromDB = await dbType.getUserByEmail(email);

		// Check if the login credentials are valid
		if (
			!dataFromDB ||
			!(await hashService.cmpHash(password, dataFromDB.password))
		) {
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
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 404, error.message);
	}
};

// Function to get all users
const getAllUsers = async (req, res) => {
	try {
		// Retrieve and respond with all users' data
		const dataFromDB = await dbType.getAllUsers();
		res.json(dataFromDB);
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 400, error.message);
	}
};

// Function to get a specific user by their ID
const getUser = async (req, res) => {
	try {
		// Validate the user ID and retrieve the user's data
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDB = await dbType.getUserById(req.params.id);

		// Respond with the user's data or an error message if the user is not found
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 404, 'Undefined user');
		}
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 400, error.message);
	}
};

// Function to edit a user's data
const editUser = async (req, res) => {
	try {
		// Normalize the user data from the request and validate the user ID and data
		let normalUser = await normalizeUser(req.body);
		await userValidationService.userIdValidation(req.params.id);
		await userValidationService.updateUserValidation(normalUser);

		// Update the user's data and respond with the modified data
		const dataFromDB = await dbType.updateUser(req.params.id, normalUser);

		// Respond with the user's updated data or an error message if the user is not found
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 'Undefined user', 404);
		}
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 400, error.message);
	}
};

// Function to change a user's account status to a business account
const changeAccountType = async (req, res) => {
	try {
		const id = req.params.id;

		// Validate the user ID and update the user's account status
		await userValidationService.userIdValidation(id);
		await dbType.updateBizUser(id);

		// Respond with a success message
		res.json({ msg: 'done' });
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 400, error.message);
	}
};

// Function to delete a user by their ID
const deleteUser = async (req, res) => {
	try {
		// Validate the user ID and delete the user
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDb = await dbType.deleteUser(req.params.id);

		// Respond with a success message or an error message if the user is not found
		res.json({
			msg: `user - ${dataFromDb.name.first} ${dataFromDb.name.last} deleted`,
		});
	} catch (error) {
		// Handle errors, if any, by sending an error response
		handleError(res, 400, error.message);
	}
};

// Export all these functions for use in other parts of the application
module.exports = {
	registerUser,
	loginUser,
	getAllUsers,
	getUser,
	editUser,
	changeAccountType,
	deleteUser,
};
