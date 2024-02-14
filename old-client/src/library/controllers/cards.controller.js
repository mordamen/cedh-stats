import dbType from '../middleware/database/cards.dbtype.middleware';
import handleError from '../middleware/errorHandler.middleware';

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

export { mostPlayedCards, uniqueCard, findNumberOfOccurrences };
