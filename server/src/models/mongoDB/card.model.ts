/**
 * Represents a card in the database.
 */
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface Card {
	// Basic card information
	quantity: number;
	boardType: string;
	finish: string;
	isFoil: boolean;
	isAlter: boolean;
	isProxy: boolean;

	// Core card details
	card: {
		id: string;
		uniqueCardId: string;
		scryfall_id: string;
		set: string;
		set_name: string;
		name: string;
		cn: string;
		layout: string;
		cmc: number;
		type: string;
		type_line: string;
		oracle_text: string;
		mana_cost: string;
		colors: string[];
		color_indicator: string[];
		color_identity: string[];

		// Additional legality information (optional)
		legalities: {
			standard: string;
			future: string;
			historic: string;
			gladiator: string;
			pioneer: string;
			explorer: string;
			modern: string;
			legacy: string;
			pauper: string;
			vintage: string;
			penny: string;
			commander: string;
			oathbreaker: string;
			brawl: string;
			historicbrawl: string;
			alchemy: string;
			paupercommander: string;
			duel: string;
			oldschool: string;
			premodern: string;
			predh: string;
		};
		frame: string;
		reserved: boolean;
		digital: boolean;
		foil: boolean;
		nonfoil: boolean;
		etched: boolean;
		glossy: boolean;
		rarity: string;
		border_color: string;
		colorshifted: boolean;
		lang: string;
		latest: boolean;
		has_multiple_editions: boolean;
		has_arena_legal: boolean;
		prices: {
			usd: number;
			eur: number;
			lastUpdatedAtUtc: string;
		};
		card_faces: object[]; // Array of card faces, if applicable
		artist: string;
		promo_types: string[];

		// URLs for external resources
		cardHoarderUrl: string;
		cardMarketUrl: string;
		tcgPlayerUrl: string;

		// Arena legality
		isArenaLegal: boolean;

		released_at: string; // Date in ISO format
		edhrec_rank: number;

		// Cardmarket and TCGplayer IDs
		cardmarket_id: number;
		tcgplayer_id: number;

		reprint: boolean;
		set_type: string;
		acorn: boolean;
		image_seq: number;
		cardTraderUrl: string;
		isToken: boolean;
		defaultFinish: string;
	};
	useCmcOverride: boolean;
	useManaCostOverride: boolean;
	useColorIdentityOverride: boolean;
	excludedFromColor: boolean;
}

// Define the card schema
export const cardSchema = new Schema<Card>({
	quantity: Number,
	boardType: String,
	finish: String,
	isFoil: Boolean,
	isAlter: Boolean,
	isProxy: Boolean,
	card: {
		id: String,
		uniqueCardId: String,
		scryfall_id: String,
		set: String,
		set_name: String,
		name: String,
		cn: String,
		layout: String,
		cmc: Number,
		type: String,
		type_line: String,
		oracle_text: String,
		mana_cost: String,
		colors: [String],
		color_indicator: [String],
		color_identity: [String],
		legalities: {
			standard: String,
			future: String,
			historic: String,
			gladiator: String,
			pioneer: String,
			explorer: String,
			modern: String,
			legacy: String,
			pauper: String,
			vintage: String,
			penny: String,
			commander: String,
			oathbreaker: String,
			brawl: String,
			historicbrawl: String,
			alchemy: String,
			paupercommander: String,
			duel: String,
			oldschool: String,
			premodern: String,
			predh: String,
		},
		frame: String,
		reserved: Boolean,
		digital: Boolean,
		foil: Boolean,
		nonfoil: Boolean,
		etched: Boolean,
		glossy: Boolean,
		rarity: String,
		border_color: String,
		colorshifted: Boolean,
		lang: String,
		latest: Boolean,
		has_multiple_editions: Boolean,
		has_arena_legal: Boolean,
		prices: {
			usd: Number,
			eur: Number,
			lastUpdatedAtUtc: String,
		},
		card_faces: [Object], // Array of card faces, if applicable
		artist: String,
		promo_types: [String],
		cardHoarderUrl: String,
		cardMarketUrl: String,
		tcgPlayerUrl: String,
		isArenaLegal: Boolean,
		released_at: String, // Date in ISO format
		edhrec_rank: Number,
		cardmarket_id: Number,
		tcgplayer_id: Number,
		reprint: Boolean,
		set_type: String,
		acorn: Boolean,
		image_seq: Number,
		cardTraderUrl: String,
		isToken: Boolean,
		defaultFinish: String,
	},
	useCmcOverride: Boolean,
	useManaCostOverride: Boolean,
	useColorIdentityOverride: Boolean,
	excludedFromColor: Boolean,
});

const Card = model<Card>('Card', cardSchema);

// export default Card;
module.exports = Card;
// Path: src/models/mongoDB/decklist.model.ts
