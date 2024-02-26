const User = require('../models/mongoDB/user.model');

// Define a function to register a new user based on provided user data
const registerUser = (userData: any) => {
	const user = new User(userData); // Create a new 'User' instance with the given 'userData'
	console.log(user); // Log the user object (for debugging)
	return user.save(); // Save the user to the database and return the result
};

// Define a function to retrieve a user by their email
const getUserByEmail = (email: any) => {
	return User.findOne({ email }); // Use the 'User' model to find a user with the specified email
};

// Define a function to retrieve all users
const getAllUsers = () => {
	return User.find(); // Use the 'User' model to retrieve all users from the database
};

// Define a function to retrieve a user by their ID
const getUserById = (id: any) => {
	return User.findById(id); // Use the 'User' model to find a user by their ID
};

// Define a function to update a user by their ID
const updateUser = (id: any, userToUpdate: any) => {
	return User.findByIdAndUpdate(id, userToUpdate, { new: true }); // Use 'findByIdAndUpdate' to update and return the modified user
};

// Define a function to change a user's business status by their ID
// const changeBusinessStatusById = (id) => {
// 	return User.findByIdAndUpdate(id, [{ $set: { isBusiness: { $not: '$isBusiness' } } }], { new: true }); // Use 'findByIdAndUpdate' with an update operation to toggle the 'isBusiness' property
// };

// Define a function to delete a user by their ID
const deleteUserById = (id: any) => {
	return User.findByIdAndDelete(id); // Use 'findByIdAndDelete' to remove a user from the database
};

// Export all these functions for use in other parts of the application
module.exports = {
	registerUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUserById,
};
