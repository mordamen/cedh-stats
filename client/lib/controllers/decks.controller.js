'use server';

import deckActions from '../actions/old.decks.actions';
import handleError from '../middleware/errorHandler.middleware';

const decksByColorIdentity = async (req, res) => {
	try {
		const decksData = await deckActions.decksByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const decksByGlobalColorIdentity = async (req, res) => {
	try {
		const decksData = await deckActions.decksByGlobalColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const deckStats = async (req, res) => {
	try {
		const decksData = await deckActions.deckStats();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesPerDeck = async (req, res) => {
	try {
		const decksData = await deckActions.averagesPerDeck();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesByColorIdentity = async (req, res) => {
	try {
		const decksData = await deckActions.averagesByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

export {
	decksByColorIdentity,
	decksByGlobalColorIdentity,
	deckStats,
	averagesPerDeck,
	averagesByColorIdentity,
};
