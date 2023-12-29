'use server';

import { userAgent } from 'next/server';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';
import { connectToDB } from '../middleware/connectToDB';

// Define a function to register a new user based on provided user data
const registerUser = (userData) => {
	const user = new User(userData); // Create a new 'User' instance with the given 'userData'
	console.log(user); // Log the user object (for debugging)
	return user.save(); // Save the user to the database and return the result
};

// Define a function to retrieve a user by their email
const getUserByEmail = (email) => {
	return User.findOne({ email }); // Use the 'User' model to find a user with the specified email
};

// Define a function to retrieve all users
const getAllUsers = () => {
	return User.find(); // Use the 'User' model to retrieve all users from the database
};

// Define a function to retrieve a user by their ID
const getUserById = (id) => {
	return User.findById(id); // Use the 'User' model to find a user by their ID
};

interface Params {
	userId: string;
	username: string;
	name: string;
	image: string;
	path: string;
}

// Define a function to update a user by their ID
export const updateUser = async ({
	userId,
	username,
	name,
	image,
	path,
}: Params): Promise<void> => {
	connectToDB();

	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				image,
			},
			{ upsert: true }
		);

		if (path === '/profile/edit') {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
};

// const updateUser = (id, userToUpdate) => {
// 	connectToDB();
// 	return User.findByIdAndUpdate(id, userToUpdate, { new: true }); // Use 'findByIdAndUpdate' to update and return the modified user
// };

// Define a function to change a user's business status by their ID
const changeBusinessStatusById = (id) => {
	return User.findByIdAndUpdate(
		id,
		[{ $set: { isBusiness: { $not: '$isBusiness' } } }],
		{ new: true }
	); // Use 'findByIdAndUpdate' with an update operation to toggle the 'isBusiness' property
};

// Define a function to delete a user by their ID
const deleteUserById = (id) => {
	return User.findByIdAndDelete(id); // Use 'findByIdAndDelete' to remove a user from the database
};

// Export all these functions for use in other parts of the application
export {
	registerUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	changeBusinessStatusById,
	deleteUserById,
};
