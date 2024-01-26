const Deck = require('../models/mongoDB/decklist.model');
const { decksByGlobalColorIdentity } = require('./decks.service');

const ITEMS_PER_PAGE = 10;
const mostPlayedCards = async (page, query) => {
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
				// id: '$_id.id',
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
					{ colorIdentity: { $regex: new RegExp(query, 'i') } },
					{ cardType: { $regex: new RegExp(query, 'i') } },
					{ cardAmount: { $regex: new RegExp(query, 'i') } },
					{ cardPercent: { $regex: new RegExp(query, 'i') } },
				],
			},
		},
		{ $sort: { cardAmount: -1 } }, // Sort for pagination
		{ $skip: offset }, // Skip initial results
		{ $limit: ITEMS_PER_PAGE }, // Limit results per page
	];

	// if (cardType) {
	// 	pipeline.push({
	// 		$match: {
	// 			'cards.v.card.type_line': new RegExp(`^${cardType}$`, 'i'),
	// 		},
	// 	});
	// }

	// if (colorIdentity && colorIdentity.length > 0) {
	// 	pipeline.push({
	// 		$match: {
	// 			'cards.v.card.color_identity': { $all: colorIdentity },
	// 		},
	// 	});
	// }

	// pipeline.push(
	// 	{
	// 		$group: {
	// 			_id: {
	// 				// id: '$cards.v.card.id',
	// 				card: '$cards.k',
	// 				color: '$cards.v.card.color_identity',
	// 				cardType: '$cards.v.card.type_line',
	// 			},
	// 			count: {
	// 				$sum: 1,
	// 			},
	// 		},
	// 	},
	// 	{
	// 		$project: {
	// 			_id: 0,
	// 			// id: '$_id.id',
	// 			cardName: '$_id.card',
	// 			colorIdentity: {
	// 				$cond: {
	// 					if: { $eq: ['$_id.color', []] },
	// 					then: 'C', // Provide a default value for colorless cards
	// 					else: {
	// 						$reduce: {
	// 							input: '$_id.color',
	// 							initialValue: '',
	// 							in: { $concat: ['$$value', '$$this'] },
	// 						},
	// 					},
	// 				},
	// 			},
	// 			cardType: '$_id.cardType',
	// 			cardAmount: '$count',
	// 			// Calculating the percentage of decks
	// 			cardPercent: {
	// 				$round: [{ $multiply: [{ $divide: ['$count', totalDecks[0].count] }, 100] }, 2],
	// 			},
	// 		},
	// 	},
	// 	{
	// 		$match: {
	// 			$or: [
	// 				{ cardName: { $regex: new RegExp(query, 'i') } },
	// 				{ colorIdentity: { $regex: new RegExp(query, 'i') } },
	// 				{ cardType: { $regex: new RegExp(query, 'i') } },
	// 				{ cardAmount: { $regex: new RegExp(query, 'i') } },
	// 				{ cardPercent: { $regex: new RegExp(query, 'i') } },
	// 			],
	// 		},
	// 	},
	// 	{ $sort: { cardAmount: -1 } }, // Sort for pagination
	// 	{ $skip: offset }, // Skip initial results
	// 	{ $limit: ITEMS_PER_PAGE } // Limit results per page
	// );
	// console.log(cardType, colorIdentity);

	// Run the aggregation pipeline
	const results = await Deck.aggregate(pipeline);

	const colorcount = await decksByGlobalColorIdentity();
	colorcount.unshift({ name: 'C', value: totalDecks[0].count });

	results.forEach((item) => {
		const cardcolor = colorcount.find(({ name }) => name == item.colorIdentity);

		if (cardcolor) item.inXDecksofColor = parseInt(((item.cardAmount / cardcolor.count) * 100).toFixed(2));
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

const uniqueCard = async () => {
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
				_id: '$cards.k',
				count: {
					$sum: 1,
				},
			},
		},
		{
			$match: {
				count: 1,
			},
		},
	];

	const results = await Deck.aggregate(pipeline);

	return results;
};

const findNumberOfOccurrences = (cardName) => {
	const inNumberOfDecks = Deck.find({
		[`Decklist.${cardName}`]: { $exists: true },
	}).count();
	return inNumberOfDecks;
};

module.exports = { mostPlayedCards, uniqueCard, findNumberOfOccurrences };
