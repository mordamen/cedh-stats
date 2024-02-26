import express from 'express'; // Import the 'express' package
const router = express.Router(); // Create an instance of the router
const decksController = require('../controllers/decks.controller');

router.get('/decksByColorIdentity', decksController.decksByColorIdentityController);

router.get('/decksByGlobalColorIdentity', decksController.decksByGlobalColorIdentityController);

router.get('/deckStats', decksController.deckStatsController);

router.get('/averagesPerDeck', decksController.averagesPerDeckController);

router.get('/averagesByColorIdentity', decksController.averagesByColorIdentityController);

router.get('/edhtop16', decksController.edhtop16);

router.post('/edhtop16decks', decksController.edhtop16decks);

module.exports = router;
