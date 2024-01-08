// Import the 'config' module to access application configuration settings
const config = require('config');

// Import a custom 'jwt' utility module for handling JSON Web Tokens (JWT)
const jwt = require('../utilities/token/jwt');

// Get the 'tokenOption' setting from the configuration to determine the token generation and verification method
const tokenOption = config.get('tokenOption');

// Define a function to generate a token with a payload and an optional expiration date
const generateToken = (payload, expDate = '30d') => {
	switch (tokenOption) {
		case 'jwt':
		default:
			// If 'tokenOption' is set to 'jwt', use the 'jwt.generateToken' function to create a JWT with the provided payload and expiration date
			return jwt.generateToken(payload, expDate);
	}
};

// Define a function to verify a token
const verifyToken = (token) => {
	switch (tokenOption) {
		case 'jwt':
		default:
			// If 'tokenOption' is set to 'jwt', use the 'jwt.verifyToken' function to verify and decode the token
			return jwt.verifyToken(token);
	}
};

// Export the 'generateToken' and 'verifyToken' functions for use in other parts of the application
module.exports = {
	generateToken,
	verifyToken,
};
