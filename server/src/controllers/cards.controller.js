const dbType = require('../middleware/database/cards.dbtype.middleware');
const handleError = require('../middleware/errorHandler.middleware');
const axios = require('axios');

const mostPlayedCards = async (req, res) => {
	try {
		// Extract data from the request body
		const { cardType, colorIdentity } = req.body;

		const decksData = await dbType.mostPlayedCards(cardType, colorIdentity);
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const uniqueCard = async (req, res) => {
	try {
		const decksData = await dbType.uniqueCard();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const findNumberOfOccurrences = async (req, res) => {
	try {
		const cardName = req.body.cardName;
		const count = await dbType.findNumberOfOccurrences(cardName);
		res.json({ cardName, count });
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

module.exports = {
	mostPlayedCards,
	uniqueCard,
	findNumberOfOccurrences,
};
