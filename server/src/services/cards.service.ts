import { decksByGlobalColorIdentity } from './decks.service';
// const { decksByGlobalColorIdentity } = require('./decks.service');

const Deck = require('../models/mongoDB/decklist.model');

const ITEMS_PER_PAGE = 10;
/**
 * Retrieves the most played cards based on the given page, query, and color identity.
 *
 * @param {number} page - The page number for pagination
 * @param {string} query - The search query for card name, color identity, type, amount, or percentage
 * @param {string} cardType - The card type for filtering cards
 * @param {string} colorID - The color identity for filtering cards
 * @return {object} The object containing data and total pages for pagination
 */
const mostPlayedCards = async (page: number, query: string, cardType: string, colorID: string): Promise<object> => {
	console.log(
		`'🚀 ~ mostPlayedCards ~ params: page: ${page}, query: ${query}, cardType: ${cardType}, colorID: ${colorID}`
	);

	const totalDecks = await Deck.aggregate([
		{
			$count: 'count',
		},
	]);

	const offset = (page - 1) * ITEMS_PER_PAGE;

	const pipeline = [
		{
			$project: {
				cards: {
					$objectToArray: '$Decklist',
				},
			},
		},
		{
			$unwind: '$cards',
		},
		{
			$group: {
				_id: {
					// id: '$cards.v.card.id',
					card: '$cards.k',
					color: '$cards.v.card.color_identity',
					cardType: '$cards.v.card.type_line',
				},
				count: {
					$sum: 1,
				},
			},
		},
		{
			$project: {
				_id: 0,
				cardName: '$_id.card',
				colorIdentity: {
					$cond: {
						if: { $eq: ['$_id.color', []] },
						then: 'C', // Provide a default value for colorless cards
						else: {
							$reduce: {
								input: '$_id.color',
								initialValue: '',
								in: { $concat: ['$$value', '$$this'] },
							},
						},
					},
				},
				cardType: '$_id.cardType',
				cardAmount: '$count',
				// Calculating the percentage of decks
				cardPercent: {
					$round: [{ $multiply: [{ $divide: ['$count', totalDecks[0].count] }, 100] }, 2],
				},
			},
		},
		{
			$match: {
				$or: [
					{ cardName: { $regex: new RegExp(query, 'i') } },
					{ cardType: { $regex: new RegExp(query, 'i') } },
					{ cardAmount: { $regex: new RegExp(query, 'i') } },
					{ cardPercent: { $regex: new RegExp(query, 'i') } },
				],
				colorIdentity: { $regex: new RegExp(colorID, 'i') },
				cardType: { $regex: new RegExp(cardType, 'i') },
			},
		},
		{ $sort: { cardAmount: -1 } }, // Sort for pagination
		{ $skip: offset }, // Skip initial results
		{ $limit: ITEMS_PER_PAGE }, // Limit results per page
	];

	// Run the aggregation pipeline
	const results = await Deck.aggregate(pipeline);

	const colorcount = await decksByGlobalColorIdentity();
	colorcount.unshift({ name: 'C', value: totalDecks[0].count });

	// console.log('🚀 ~ mostPlayedCards ~ colorcount:', colorcount);

	results.forEach((item: { colorIdentity: any; inXDecksofColor: number; cardAmount: number }) => {
		const cardcolor = colorcount.find(({ name }: { name: string }) => {
			return name == item.colorIdentity;
		});

		// console.log('🚀 ~ results.forEach ~ cardcolor:', cardcolor);

		if (cardcolor) item.inXDecksofColor = parseInt(((item.cardAmount / cardcolor.value) * 100).toFixed(2));
		// console.log('🚀 ~ results.forEach ~ item.cardAmount:', item.cardAmount);
	});

	// Calculate totalPages
	const totalPages = Math.ceil(totalDecks[0].count / ITEMS_PER_PAGE);

	// Create a new object with both results and totalPages
	const response = {
		data: results,
		totalPages: totalPages,
	};

	// Return the new object (or assign it to a variable for further use)
	return response;
};

// module.exports = mostPlayedCards;
export { mostPlayedCards };
