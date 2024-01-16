const cardsService = require('../services/cards.service');
const handleError = require('../middleware/errorHandler.middleware');
const normalizeColorIdentity = require('../middleware/normalizeColorIdentity.middleware');

// Server-side API route handler
const mostPlayedCards = async (req, res) => {
	try {
		const { page, query } = req.query;

		const decksData = await cardsService.mostPlayedCards(page, query);

		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const mostPlayedCards2 = async (req, res) => {
	try {
		// Extract data from query parameters
		let { cardType, colorIdentity } = req.query;

		const normalizedColorIdentity = normalizeColorIdentity(colorIdentity);
		console.log('normalized colors: ', normalizedColorIdentity); // Always outputs an array of characters

		const decksData = await cardsService.mostPlayedCards(cardType, normalizedColorIdentity);
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const uniqueCard = async (req, res) => {
	try {
		const decksData = await cardsService.uniqueCard();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const findNumberOfOccurrences = async (req, res) => {
	try {
		const cardName = req.body.cardName;
		const count = await cardsService.findNumberOfOccurrences(cardName);
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
