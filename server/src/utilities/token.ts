// Import required dependencies
const jwtWebToken = require('jsonwebtoken'); // Import the JSON Web Token library

// Function to generate a JSON Web Token (JWT) with a given payload and optional expiration date
const generateToken = (payload: any, expDate = '30d') =>
	new Promise((resolve, reject) => {
		jwtWebToken.sign(
			payload, // Data to be encoded in the JWT
			process.env.JWT_SECRET, // Secret key for JWT encoding (from environment variable)
			{ expiresIn: expDate }, // JWT expiration date (default: 30 days)
			(error: any, token: any) => {
				if (error) reject(error);
				// If there is an error during token generation, reject the promise
				else resolve(token); // If successful, resolve the promise with the generated token
			}
		);
	});

// Function to verify and decode a JWT
const verifyToken = (token: any) =>
	new Promise((resolve, reject) => {
		jwtWebToken.verify(token, process.env.JWT_SECRET, (error: any, payload: any) => {
			if (error) reject(error);
			// If there is an error during token verification, reject the promise
			else resolve(payload); // If successful, resolve the promise with the decoded payload
		});
	});

// Export the functions for use in other parts of the application
module.exports = {
	generateToken,
	verifyToken,
};
