import express from 'express'; // Import the 'express' package
import {
	changeAccountTypeController,
	deleteUserController,
	editUserController,
	getAllUsersController,
	getUserController,
	loginUserController,
	registerUserController,
} from '../controllers/users.controller';
import permissionsMiddlewareRouter from '../middleware/permissions.middleware';
// const userController = require('../controllers/users.controller');
// const permissionsMiddlewareRouter = require('../middleware/permissions.middleware');
const router = express.Router(); // Create an instance of the router
const authMiddlewareRouter = require('../middleware/auth.middleware');

// REGISTER NEW USER
// ROUTE: /users | METHOD: POST | AUTHORIZATION: All | RETURN: Registered User | OTHER: Needs unique email
router.post(
	'/',
	// userController.registerUserController
	registerUserController
);

// LOGIN USER
// ROUTE: /users/login | METHOD: POST | AUTHORIZATION: All | RETURN: Encrypted Token
router.post(
	'/login',
	// userController.loginUserController
	loginUserController
);

//GET ALL USERS
// ROUTE: /users | METHOD: GET | AUTHORIZATION: Admin | RETURN: Array Of Users
router.get(
	'/',
	authMiddlewareRouter,
	// permissionsMiddlewareRouter(true, false, false),
	// 	userController.getAllUsersController
	getAllUsersController
);

//Get specific user
// ROUTE: /users/:id | METHOD: GET | AUTHORIZATION: Admin or the user himself | RETURN: User
router.get(
	'/:id',
	authMiddlewareRouter,
	// permissionsMiddlewareRouter(true, false, true),
	// 	userController.getUserController
	getUserController
);

//Edit user
// ROUTE: /users/:id | METHOD: PUT | AUTHORIZATION: The registered user | RETURN: The edited user
router.put(
	'/:id',
	authMiddlewareRouter,
	// permissionsMiddlewareRouter(false, false, true),
	// userController.editUserController
	editUserController
);

//Change account status - Business Account
// ROUTE: /users/:id | METHOD: PATCH | AUTHORIZATION: The registered user | RETURN: The edited user
router.patch(
	'/:id',
	authMiddlewareRouter,
	// permissionsMiddlewareRouter(false, false, true),
	// userController.changeAccountTypeController
	changeAccountTypeController
);

//Delete User
// ROUTE: /users/:id | METHOD: PATCH | AUTHORIZATION: The registered User or Admin | RETURN: The Deleted User
router.delete(
	'/:id',
	authMiddlewareRouter,
	// permissionsMiddlewareRouter(true, false, true),
	// userController.deleteUserController
	deleteUserController
);

module.exports = router;
