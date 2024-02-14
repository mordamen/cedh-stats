const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards.controller');

router.get('/mostPlayedCards', cardsController.mostPlayedCards);

router.get('/uniqueCard', cardsController.uniqueCard);

router.get('/findNumberOfOccurrences', cardsController.findNumberOfOccurrences);

module.exports = router;
