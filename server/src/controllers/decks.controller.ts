import handleError from '../middleware/errorHandler.middleware'; // Middleware for handling errors
import {
	averagesPerDeck,
	averagesByColorIdentity,
	decksByColorIdentity,
	decksByGlobalColorIdentity,
	deckStats,
} from '../services/decks.service';
// const decksService = require('../services/decks.service');
const axios = require('axios');
const Deck = require('../models/mongoDB/decklist.model');

const averagesPerDeckController = async (req: any, res: any) => {
	try {
		// const decksData = await decksService.averagesPerDeck();
		const decksData = await averagesPerDeck();
		res.json(decksData);
	} catch (error: any) {
		handleError(res, error.message, 400);
	}
};

const averagesByColorIdentityController = async (req: { query: { page: any; query: any } }, res: any) => {
	try {
		const { page, query } = req.query;

		// const decksData = await decksService.averagesByColorIdentity(page, query);
		const decksData = await averagesByColorIdentity(page, query);
		res.json(decksData);
	} catch (error: any) {
		handleError(res, error.message, 400);
	}
};

const decksByColorIdentityController = async (req: any, res: any) => {
	try {
		// const decksData = await decksService.decksByColorIdentity();
		const decksData = await decksByColorIdentity();
		res.json(decksData);
	} catch (error: any) {
		handleError(res, error.message, 400);
	}
};

const decksByGlobalColorIdentityController = async (req: any, res: any) => {
	try {
		// const decksData = await decksService.decksByGlobalColorIdentity();
		const decksData = await decksByGlobalColorIdentity();
		res.json(decksData);
	} catch (error: any) {
		handleError(res, error.message, 400);
	}
};

const deckStatsController = async (req: { query: { page: any; query: any; colorID: any } }, res: any) => {
	try {
		const { page, query, colorID } = req.query;

		// const decksData = await decksService.deckStats(page, query, colorID);
		const decksData = await deckStats(page, query, colorID);
		res.json(decksData);
	} catch (error: any) {
		handleError(res, error.message, 400);
	}
};

const edhtop16 = async (req: any, res: any) => {
	try {
		const base_url = 'https://edhtop16.com/api/';
		const data = {};

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		const response = await axios.post(base_url + 'req', data, {
			headers,
		});
		const decksData = response.data;

		res.json(decksData);
	} catch (error: any) {
		console.error('Error fetching data from the API:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Function to extract decklist URLs
function extractDecklistUrls(data: any[]): string[] {
	let urls: string[] = [];
	for (let item of data) {
		let urlParts = item.decklist.split('/');
		let id = urlParts[urlParts.length - 1];
		urls.push(id);
	}
	return urls;
}

// Function to fetch a decklist from the Moxfield API
async function fetchDecklist(id: any) {
	try {
		const response = await axios.get(`https://api.moxfield.com/v2/decks/all/${id}`);
		return response.data;
	} catch (error: any) {
		console.error('Error fetching decklist:', error.message);
	}
}

const edhtop16new = async (req: any, res: any) => {
	try {
		const base_url = 'https://edhtop16.com/api/';
		const data = {};

		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		const response = await axios.post(base_url + 'req', data, {
			headers,
		});
		const decksData = response.data;

		// Extract decklist URLs
		const urls = extractDecklistUrls(decksData);

		// Fetch decklists and save them
		const decklists = await Promise.all(urls.map(fetchDecklist));

		// Here you would save the decklists to your database
		for (let decklist of decklists) {
			let decklistDoc = new Deck(decklist);
			await decklistDoc.save();
		}

		res.json(decklists);
	} catch (error: any) {
		console.error('Error fetching data from the API:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const edhtop16decks = async (req: any, res: any) => {
	try {
		const base_url = 'https://api2.moxfield.com/v2/';
		const data = req.body;
		const response = await axios.post(`${base_url}decks/remote-preview`, data);

		const username = 'MOXFIELD_USERNAME';
		const password = 'MOXFIELD_PASSWORD';

		const headers = {
			'Content-type': 'application/json',
			Accept: 'application/json',
		};

		const tokenResponse = await axios.post(
			`${base_url}account/token`,
			{ userName: username, password: password },
			{ headers }
		);
		const token = tokenResponse.data.access_token;

		const moxfieldHeaders = {
			'Content-type': 'application/json',
			Accept: 'application/json',
			Authorization: 'Bearer ' + token,
		};

		const postData = {
			commanderCardId: response.data.commander.cardId,
			format: 'commander',
			mainboard: response.data.mainboard,
			name: response.data.name,
			maybeboard: '',
			playStyle: 'paperDollars',
			pricingProvider: 'tcgplayer',
			sideboard: '',
			visibility: 'public',
		};

		// Change the endpoint to 'edhtop16_decks'
		const createDeckResponse = await axios.post(`${base_url}edhtop16_decks`, postData, { headers: moxfieldHeaders });
		const createdDeck = createDeckResponse.data.deck;

		const deleteDeckResponse = await axios.delete(`${base_url}edhtop16_decks/${createdDeck.id}`, {
			headers: moxfieldHeaders,
		});

		const deck = new Deck(createdDeck);
		res.json(deck);
	} catch (error: any) {
		console.error('Error importing deck from Moxfield:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	decksByColorIdentityController,
	decksByGlobalColorIdentityController,
	deckStatsController,
	averagesPerDeckController,
	averagesByColorIdentityController,
	edhtop16,
	edhtop16decks,
};
