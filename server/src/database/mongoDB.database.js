// Import necessary modules for database connection
const config = require('config'); // Access application configuration settings
const mongoose = require('mongoose'); // Import the Mongoose library for working with MongoDB

// Define a function to connect to a MongoDB database
const connectToMongoDB = () => {
	// Use Mongoose to establish a connection to the MongoDB database using the URL from the application's configuration
	return mongoose.connect(config.get('dbConfig.url'));
};

// Export the 'connectToMongoDB' function for use in other parts of the application
module.exports = connectToMongoDB;
