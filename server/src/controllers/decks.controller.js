const handleError = require('../middleware/errorHandler.middleware');
const decksService = require('../services/decks.service');

const decksByColorIdentity = async (req, res) => {
	try {
		const decksData = await decksService.decksByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const decksByGlobalColorIdentity = async (req, res) => {
	try {
		const decksData = await decksService.decksByGlobalColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const deckStats = async (req, res) => {
	try {
		const decksData = await decksService.deckStats();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesPerDeck = async (req, res) => {
	try {
		const decksData = await decksService.averagesPerDeck();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const averagesByColorIdentity = async (req, res) => {
	try {
		const decksData = await decksService.averagesByColorIdentity();
		res.json(decksData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const edhtop16 = async (req, res) => {
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
	} catch (error) {
		console.error('Error fetching data from the API:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const edhtop16decks = async (req, res) => {
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
	} catch (error) {
		console.error('Error importing deck from Moxfield:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	decksByColorIdentity,
	decksByGlobalColorIdentity,
	deckStats,
	averagesPerDeck,
	averagesByColorIdentity,
	edhtop16,
	edhtop16decks,
};
