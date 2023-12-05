// Import the 'mongoose' library for MongoDB schema and model creation
const mongoose = require('mongoose');

// Import validation schemas and constants from 'mongoose.validation' for schema definitions
const {
	URL,
	DEFAULT_STRING_SCHEMA,
	DEFAULT_STRING_SCHEMA_REQUIRED,
} = require('../../validation/mongoose/mongoose.validation');

// Define a sub-schema for the 'Name' field, consisting of 'first', 'middle', and 'last' name components
const Name = new mongoose.Schema({
	first: DEFAULT_STRING_SCHEMA_REQUIRED, // First name is a required string
	middle: DEFAULT_STRING_SCHEMA, // Middle name is an optional string
	last: DEFAULT_STRING_SCHEMA_REQUIRED, // Last name is a required string
});

// Define a sub-schema for the 'Image' field, including 'url' and 'alt' properties
const Image = new mongoose.Schema({
	url: URL, // URL property must adhere to a specific format
	alt: DEFAULT_STRING_SCHEMA_REQUIRED, // Alt property is a required string
});

// Define the main user schema, including fields like 'name', 'email', 'password', 'image', 'isAdmin', 'isBusiness', and 'createdAt'
const userSchema = new mongoose.Schema({
	name: Name, // 'Name' sub-schema is used for the 'name' field
	email: {
		type: String,
		required: [true, 'Email is required'], // Email is a required string
		match: [
			// Regular expression to validate email format
			RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
			'Invalid email format',
		],
		lowercase: true, // Convert email to lowercase
		trim: true, // Trim leading/trailing white spaces
		unique: [true, 'Email already exists'], // Ensure email uniqueness
	},
	password: {
		type: String,
		required: [true, 'Password is required'], // Password is a required string
		match: [
			// Regular expression to enforce password complexity
			RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
		],
	},
	image: Image, // 'Image' sub-schema is used for the 'image' field
	isAdmin: { type: Boolean, default: false }, // Default value for 'isAdmin' is false
	isBusiness: { type: Boolean, default: false }, // Default value for 'isBusiness' is false
	createdAt: {
		type: Date,
		default: Date.now, // Default value for 'createdAt' is the current date and time
	},
});

// Create a 'User' model using the 'userSchema' and name it 'users'
const User = mongoose.model('users', userSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;
