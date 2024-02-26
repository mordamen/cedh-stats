// Import the 'mongoose' library for MongoDB schema and model creation
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface User {
	_id: mongoose.Types.ObjectId;
	username: string;
	password: string;
	email: string;
	profilePicture?: string;
	createdAt?: Date;
	decks?: mongoose.Types.ObjectId[]; // Array of deck IDs
}

// Define the main user schema, including fields like 'name', 'email', 'password', 'image', 'isAdmin', 'isBusiness', and 'createdAt'
// const userSchema = new Schema({
// 	username: DEFAULT_STRING_SCHEMA_REQUIRED, // Username is a required string
// 	password: {
// 		type: String,
// 		required: [true, 'Password is required'], // Password is a required string
// 		match: [
// 			// Regular expression to enforce password complexity
// 			RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
// 			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
// 		],
// 	},
// 	email: {
// 		type: String,
// 		required: [true, 'Email is required'], // Email is a required string
// 		match: [
// 			// Regular expression to validate email format
// 			RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
// 			'Invalid email format',
// 		],
// 		lowercase: true, // Convert email to lowercase
// 		trim: true, // Trim leading/trailing white spaces
// 		unique: [true, 'Email already exists'], // Ensure email uniqueness
// 	},
// 	profilePicture: profilePicture, // 'Image' sub-schema is used for the 'image' field
// 	isAdmin: { type: Boolean, default: false }, // Default value for 'isAdmin' is false
// 	isBusiness: { type: Boolean, default: false }, // Default value for 'isBusiness' is false
// 	createdAt: {
// 		type: Date,
// 		default: Date.now, // Default value for 'createdAt' is the current date and time
// 	},
// });

const userSchema = new Schema<User>({
	username: { type: String, required: true, unique: true },
	password: {
		type: String,
		required: [true, 'Password is required'], // Password is a required string
		match: [
			// Regular expression to enforce password complexity
			RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
		],
	},
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
		unique: true, // Ensure email uniqueness
	},
	createdAt: {
		type: Date,
		default: Date.now, // Default value for 'createdAt' is the current date and time
	},
	decks: [{ type: mongoose.Types.ObjectId, ref: 'Deck' }],
});

const User = model<User>('User', userSchema);

// export default User;

module.exports = User;
// Path: src/models/mongoDB/user.model.ts
