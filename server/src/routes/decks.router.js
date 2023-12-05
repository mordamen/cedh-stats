const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decks.controller');

router.get('/decksByColorIdentity', decksController.decksByColorIdentity);

router.get(
	'/decksByGlobalColorIdentity',
	decksController.decksByGlobalColorIdentity
);

router.get('/deckStats', decksController.deckStats);

router.get('/averagesPerDeck', decksController.averagesPerDeck);

router.get('/averagesByColorIdentity', decksController.averagesByColorIdentity);

module.exports = router;
