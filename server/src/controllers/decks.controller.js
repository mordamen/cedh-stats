const dbType = require('../middleware/database/decks.dbtype.middleware');
const handleError = require('../middleware/errorHandler.middleware');

const decksByColorIdentity = async (req, res) => {
	try {
		const decksData = await dbType.decksByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const decksByGlobalColorIdentity = async (req, res) => {
	try {
		const decksData = await dbType.decksByGlobalColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const deckStats = async (req, res) => {
	try {
		const decksData = await dbType.deckStats();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesPerDeck = async (req, res) => {
	try {
		const decksData = await dbType.averagesPerDeck();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesByColorIdentity = async (req, res) => {
	try {
		const decksData = await dbType.averagesByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

module.exports = {
	decksByColorIdentity,
	decksByGlobalColorIdentity,
	deckStats,
	averagesPerDeck,
	averagesByColorIdentity,
};
