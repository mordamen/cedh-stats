// Import the 'config' module to access application configuration settings
const config = require('config');

// Import the 'deckServiceMongo' module for MongoDB database operations
const deckServiceMongo = require('../../services/decks.service');

// Get the 'dbOption' setting from the configuration to determine the database option
const dbOption = config.get('dbOption');

//
const decksByColorIdentity = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'deckServiceMongo.decksByColorIdentity' to retrieve a list of decks by color identity
			return deckServiceMongo.decksByColorIdentity();
	}
};

//
const decksByGlobalColorIdentity = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'deckServiceMongo.decksByGlobalColorIdentity' to retrieve a list of decks by color identity
			return deckServiceMongo.decksByGlobalColorIdentity();
	}
};

//
const deckStats = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'deckServiceMongo.decksByGlobalColorIdentity' to retrieve a list of decks by color identity
			return deckServiceMongo.deckStats();
	}
};

//
const averagesPerDeck = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'deckServiceMongo.decksByGlobalColorIdentity' to retrieve a list of decks by color identity
			return deckServiceMongo.averagesPerDeck();
	}
};

//
const averagesByColorIdentity = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'deckServiceMongo.decksByGlobalColorIdentity' to retrieve a list of decks by color identity
			return deckServiceMongo.averagesByColorIdentity();
	}
};

// Export all these functions for use in other parts of the application
module.exports = {
	decksByColorIdentity,
	decksByGlobalColorIdentity,
	deckStats,
	averagesPerDeck,
	averagesByColorIdentity,
};
