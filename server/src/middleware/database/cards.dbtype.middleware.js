// Import the 'config' module to access application configuration settings
const config = require('config');

// Import the 'decksServiceMongo' module for MongoDB database operations
const cardsServiceMongo = require('../../services/cards.service');

// Get the 'dbOption' setting from the configuration to determine the database option
const dbOption = config.get('dbOption');

//
const mostPlayedCards = (cardType, colorIdentity) => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'cardsServiceMongo.getAllCards' to retrieve all cards
			return cardsServiceMongo.mostPlayedCards(cardType, colorIdentity);
	}
};

const uniqueCard = () => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'cardsServiceMongo.getAllCards' to retrieve all cards
			return cardsServiceMongo.uniqueCard();
	}
};

//
const findNumberOfOccurrences = (cardName) => {
	switch (dbOption) {
		case 'mongo':
		default:
			// If 'dbOption' is set to 'mongo', use 'cardsServiceMongo.getAllCards' to retrieve all cards
			return cardsServiceMongo.findNumberOfOccurrences(cardName);
	}
};

// Export all these functions for use in other parts of the application
module.exports = {
	mostPlayedCards,
	uniqueCard,
	findNumberOfOccurrences,
};
