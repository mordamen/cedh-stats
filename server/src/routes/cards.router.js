const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards.controller');

router.get('/mostPlayedCards', cardsController.mostPlayedCards);

module.exports = router;
