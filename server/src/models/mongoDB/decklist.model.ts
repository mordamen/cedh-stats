/**
 * Represents the schema for a deck in the MongoDB database.
 */
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const { cardSchema } = require('./card.model');
const { matchResultSchema } = require('./match_results.model');

interface Deck {
	_id: mongoose.Types.ObjectId;
	user_id: mongoose.Types.ObjectId;
	title: string;
	commander: string[];
	color_identity: string;
	decklist: Map<string, typeof cardSchema>;
	match_results: (typeof matchResultSchema)[];
}

// Define the schema for a deck in the MongoDB database
const deckSchema = new Schema<Deck>(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User document
		title: { type: String, required: true }, // Title of the deck
		commander: { type: [String], required: true }, // Commanders of the deck
		color_identity: { type: String, required: true }, // Color identity of the deck
		decklist: {
			type: Map<string, typeof cardSchema>, // Use card schema type for decklist entries
		},
		match_results: [{ type: Schema.Types.ObjectId, ref: 'MatchResult' }], // Reference to the MatchResult documents
	},
	{ collection: 'decks' } // Specify the collection name in the MongoDB database
);

// Define the main deck schema
const old_deckSchema = new Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Commander: {
			type: [String],
			required: true,
		},
		ColorIdentity: {
			type: String,
			required: true,
		},
		Decklist: {
			type: Map<string, typeof cardSchema>, // Use card schema type for decklist entries
		},
	},
	{ collection: 'decks' }
);

// Create the model
const Deck = model('Deck', deckSchema);

// export default Deck;
module.exports = Deck;
// Path: src/routes/decks.router.ts
