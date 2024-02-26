// Import necessary modules for database connection
const mongoose = require('mongoose'); // Import the Mongoose library for working with MongoDB

// Define a function to connect to a MongoDB database
const connectToMongoDB = () => {
	// Use Mongoose to establish a connection to the MongoDB database using the URL from the application's configuration
	return mongoose.connect(process.env.MONGODB_URI);
};

// Export the 'connectToMongoDB' function for use in other parts of the application
module.exports = connectToMongoDB;
