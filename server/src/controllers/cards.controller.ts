// const cardsService = require('../services/cards.service');

import handleError from '../middleware/errorHandler.middleware'; // Middleware for handling errors
import { mostPlayedCards } from '../services/cards.service';

/**
 * Controller function to retrieve data for the most played cards.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the data is sent as a JSON response.
 */
const mostPlayedCardsController = async (
	req: { query: { page: number; query: string; cardType: string; colorID: string } },
	res: any
): Promise<void> => {
	try {
		// Extract query parameters from the request
		const { page, query, cardType, colorID } = req.query;

		// Retrieve data for the most played cards using the query parameters
		// const data = await cardsService.mostPlayedCards(page, query, cardType, colorID);
		const data = await mostPlayedCards(page, query, cardType, colorID);

		// Send the retrieved data as JSON response
		res.json(data);
	} catch (error: any) {
		// Handle and send error message with status code 400
		handleError(res, error.message, 400);
	}
};

// module.exports = {
// 	mostPlayedCardsController,
// };

export { mostPlayedCardsController };
