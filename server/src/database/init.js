// Import the 'config' module to access application configuration settings
const config = require('config');

// Get the 'dbOption' setting from the configuration, which specifies the desired database
const dbOption = config.get('dbOption');

// Import the 'connectToMongoDB' function from a separate module for connecting to MongoDB
const connectToMongoDB = require('./mongoDB.database');

// Define a function to connect to a database based on the 'dbOption' setting
const connectToDB = () => {
	switch (dbOption) {
		case 'mongoDB':
			// If 'dbOption' is set to "mongoDB", call the 'connectToMongoDB' function to establish a MongoDB connection
			return connectToMongoDB();
	}
};

// Export the 'connectToDB' function, allowing it to be used in other parts of the application
module.exports = connectToDB;
