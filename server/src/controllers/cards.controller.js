const cardsService = require('../services/cards.service');
const handleError = require('../middleware/errorHandler.middleware');

/**
 * Handles the server-side API route for retrieving the most played cards
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const mostPlayedCards = async (req, res) => {
	try {
		// Extract query parameters from the request
		const { page, query, cardType, colorID } = req.query;

		// Retrieve data for the most played cards using the query parameters
		const data = await cardsService.mostPlayedCards(page, query, cardType, colorID);

		// Send the retrieved data as JSON response
		res.json(data);
	} catch (error) {
		// Handle and send error message with status code 400
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
