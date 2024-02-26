import express from 'express'; // Import the 'express' package
const router = express.Router(); // Create an instance of the router
const cardsController = require('../controllers/cards.controller');

router.get('/mostPlayedCards', cardsController.mostPlayedCardsController);

module.exports = router;
