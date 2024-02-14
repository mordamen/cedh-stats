const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decks.controller');

router.get('/decksByColorIdentity', decksController.decksByColorIdentity);

router.get('/decksByGlobalColorIdentity', decksController.decksByGlobalColorIdentity);

router.get('/deckStats', decksController.deckStats);

router.get('/averagesPerDeck', decksController.averagesPerDeck);

router.get('/averagesByColorIdentity', decksController.averagesByColorIdentity);

router.get('/edhtop16', decksController.edhtop16);

router.post('/edhtop16decks', decksController.edhtop16decks);

module.exports = router;
