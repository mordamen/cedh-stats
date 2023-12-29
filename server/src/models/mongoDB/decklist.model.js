const mongoose = require('mongoose');
const cardSchema = require('./card.model');

// Define the main deck schema
const deckSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Commander: {
			type: [String], // Since there can be multiple commanders
			required: true,
		},
		ColorIdentity: {
			type: String,
			required: true,
		},
		Decklist: {
			type: Map,
			of: cardSchema,
		},
	},
	{ collection: 'decks' }
);

// Create the model
const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
