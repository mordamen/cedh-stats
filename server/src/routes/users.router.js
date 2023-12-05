const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const authMiddleware = require('../middleware/auth.middleware');
const permissionsMiddleware = require('../middleware/permissions.middleware');

// REGISTER NEW USER
// ROUTE: /users | METHOD: POST | AUTHORIZATION: All | RETURN: Registered User | OTHER: Needs unique email
router.post('/', userController.registerUser);

// LOGIN USER
// ROUTE: /users/login | METHOD: POST | AUTHORIZATION: All | RETURN: Encrypted Token
router.post('/login', userController.loginUser);

//GET ALL USERS
// ROUTE: /users | METHOD: GET | AUTHORIZATION: Admin | RETURN: Array Of Users
router.get(
	'/',
	authMiddleware,
	permissionsMiddleware(true, false, false),
	userController.getAllUsers
);

//Get specific user
// ROUTE: /users/:id | METHOD: GET | AUTHORIZATION: Admin or the user himself | RETURN: User
router.get(
	'/:id',
	authMiddleware,
	permissionsMiddleware(true, false, true),
	userController.getUser
);

//Edit user
// ROUTE: /users/:id | METHOD: PUT | AUTHORIZATION: The registered user | RETURN: The edited user
router.put(
	'/:id',
	authMiddleware,
	permissionsMiddleware(false, false, true),
	userController.editUser
);

//Change account status - Business Account
// ROUTE: /users/:id | METHOD: PATCH | AUTHORIZATION: The registered user | RETURN: The edited user
router.patch(
	'/:id',
	authMiddleware,
	permissionsMiddleware(false, false, true),
	userController.changeAccountType
);

//Delete User
// ROUTE: /users/:id | METHOD: PATCH | AUTHORIZATION: The registered User or Admin | RETURN: The Deleted User
router.delete(
	'/:id',
	authMiddleware,
	permissionsMiddleware(true, false, true),
	userController.deleteUser
);

module.exports = router;
