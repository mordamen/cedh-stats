import mongoose from 'mongoose';
import User from './helpers/definitions';
// Import validation schemas and constants from 'mongoose.validation' for schema definitions
import {
	URL,
	DEFAULT_STRING_SCHEMA,
	DEFAULT_STRING_SCHEMA_REQUIRED,
} from '../validation/mongoose/default.validation';

const UserSchema = new mongoose.Schema<User>({
	id: {
		type: String,
		required: true,
	},
	name: {
		first: DEFAULT_STRING_SCHEMA_REQUIRED, // First name is a required string
		middle: DEFAULT_STRING_SCHEMA, // Middle name is an optional string
		last: DEFAULT_STRING_SCHEMA_REQUIRED, // Last name is a required string
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
	password: {
		type: String,
		required: [true, 'Password is required'], // Password is a required string
		match: [
			// Regular expression to enforce password complexity
			RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
		],
	},
	image: {
		url: URL, // URL property must adhere to a specific format
		alt: DEFAULT_STRING_SCHEMA_REQUIRED, // Alt property is a required string
	},
	// isAdmin: { type: Boolean, default: false }, // Default value for 'isAdmin' is false
	// isBusiness: { type: Boolean, default: false }, // Default value for 'isBusiness' is false
	createdAt: {
		type: Date,
		default: Date.now, // Default value for 'createdAt' is the current date and time
	},
});

// Create a 'User' model using the 'userSchema' and name it 'users'
const User = mongoose.models.User || mongoose.model('users', UserSchema);

// Export the 'User' model for use in other parts of the application
export default User;
