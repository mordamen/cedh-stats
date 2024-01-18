import { mostPlayedCardsData } from '@/src/constants/definitions';
import Deck from '../models/decklist.model';
import { decksByGlobalColorIdentity } from './old.decks.actions';
import { unstable_noStore as noStore } from 'next/cache';
import { connectToDB } from '../middleware/connectToDB';

const ITEMS_PER_PAGE = 10;
const mostPlayedCards = async (page: number, query: string) => {
	noStore();
	connectToDB();

	try {
		const totalDecks = await Deck.aggregate([
			{
				$count: 'count',
			},
		]);

		const colorcount = await decksByGlobalColorIdentity();
		colorcount.unshift({ _id: 'C', count: totalDecks[0].count });

		const offset = (page - 1) * ITEMS_PER_PAGE;

		const pipeline = [
			{
				$project: {
					cards: {
						$objectToArray: '$Decklist',
					},
				},
			},
			{ $unwind: '$cards' },
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

		const results: mostPlayedCardsData[] = await Deck.aggregate(pipeline);

		results.forEach((item) => {
			const cardcolor = colorcount.find(({ _id }) => _id == item.colorIdentity);

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
	} catch (error: any) {
		throw new Error(`Failed to get most played cards data: ${error.message}`);
	}
};

// const mostPlayedCardsOld = async (query: string, currentPage: number) => {
// 	noStore();

// 	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

// 	const totalDecks = await Deck.aggregate([
// 		{
// 			$count: 'count',
// 		},
// 	]);

// 	const colorcount = await decksByGlobalColorIdentity();

// 	colorcount.unshift({ _id: 'C', count: totalDecks[0].count });

// 	const pipeline = [
// 		{
// 			$project: {
// 				cards: {
// 					$objectToArray: '$Decklist',
// 				},
// 			},
// 		},
// 		{ $unwind: '$cards' },
// 		{
// 			$group: {
// 				_id: {
// 					// id: '$cards.v.card.id',
// 					card: '$cards.k',
// 					color: '$cards.v.card.color_identity',
// 					cardType: '$cards.v.card.type_line',
// 				},
// 				count: {
// 					$sum: 1,
// 				},
// 			},
// 		},
// 		{
// 			$project: {
// 				_id: 0,
// 				// id: '$_id.id',
// 				cardName: '$_id.card',
// 				colorIdentity: {
// 					$cond: {
// 						if: { $eq: ['$_id.color', []] },
// 						then: 'C', // Provide a default value for colorless cards
// 						else: {
// 							$reduce: {
// 								input: '$_id.color',
// 								initialValue: '',
// 								in: { $concat: ['$$value', '$$this'] },
// 							},
// 						},
// 					},
// 				},
// 				cardType: '$_id.cardType',
// 				cardAmount: '$count',
// 				// Calculating the percentage of decks
// 				cardPercent: {
// 					$round: [{ $multiply: [{ $divide: ['$count', totalDecks[0].count] }, 100] }, 2],
// 				},
// 			},
// 		},
// 		{
// 			$match: {
// 				$or: [
// 					{ cardName: { $regex: new RegExp(query, 'i') } },
// 					{ colorIdentity: { $regex: new RegExp(query, 'i') } },
// 					{ cardType: { $regex: new RegExp(query, 'i') } },
// 					{ cardAmount: { $regex: new RegExp(query, 'i') } },
// 					{ cardPercent: { $regex: new RegExp(query, 'i') } },
// 				],
// 			},
// 		},
// 		{ $sort: { cardAmount: -1 } }, // Sort for pagination
// 		{ $skip: offset }, // Skip initial results
// 		{ $limit: ITEMS_PER_PAGE }, // Limit results per page
// 	];

// 	// if (cardType) {
// 	// 	pipeline.push({
// 	// 		$match: {
// 	// 			'cards.v.card.type_line': new RegExp(`^${cardType}$`, 'i'),
// 	// 		},
// 	// 	});
// 	// }

// 	// if (colorIdentity && colorIdentity.length > 0) {
// 	// 	pipeline.push({
// 	// 		$match: {
// 	// 			'cards.v.card.color_identity': { $all: colorIdentity },
// 	// 		},
// 	// 	});
// 	// }

// 	// pipeline.push(
// 	// 	{
// 	// 		$group: {
// 	// 			_id: {
// 	// 				// id: '$cards.v.card.id',
// 	// 				card: '$cards.k',
// 	// 				color: '$cards.v.card.color_identity',
// 	// 				cardType: '$cards.v.card.type_line',
// 	// 			},
// 	// 			count: {
// 	// 				$sum: 1,
// 	// 			},
// 	// 		},
// 	// 	},
// 	// 	{
// 	// 		$project: {
// 	// 			_id: 0,
// 	// 			// id: '$_id.id',
// 	// 			cardName: '$_id.card',
// 	// 			colorIdentity: {
// 	// 				$cond: {
// 	// 					if: { $eq: ['$_id.color', []] },
// 	// 					then: 'C', // Provide a default value for colorless cards
// 	// 					else: {
// 	// 						$reduce: {
// 	// 							input: '$_id.color',
// 	// 							initialValue: '',
// 	// 							in: { $concat: ['$$value', '$$this'] },
// 	// 						},
// 	// 					},
// 	// 				},
// 	// 			},
// 	// 			cardType: '$_id.cardType',
// 	// 			cardAmount: '$count',
// 	// 			// Calculating the percentage of decks
// 	// 			cardPercent: {
// 	// 				$round: [{ $multiply: [{ $divide: ['$count', totalDecks[0].count] }, 100] }, 2],
// 	// 			},
// 	// 		},
// 	// 	},
// 	// 	{
// 	// 		$match: {
// 	// 			$or: [
// 	// 				{ cardName: { $regex: new RegExp(query, 'i') } },
// 	// 				{ colorIdentity: { $regex: new RegExp(query, 'i') } },
// 	// 				{ cardType: { $regex: new RegExp(query, 'i') } },
// 	// 				{ cardAmount: { $regex: new RegExp(query, 'i') } },
// 	// 				{ cardPercent: { $regex: new RegExp(query, 'i') } },
// 	// 			],
// 	// 		},
// 	// 	},
// 	// 	{ $sort: { cardAmount: -1 } }, // Sort for pagination
// 	// 	{ $skip: offset }, // Skip initial results
// 	// 	{ $limit: ITEMS_PER_PAGE } // Limit results per page
// 	// ),
// 	// console.log(cardType, colorIdentity);

// 	// Run the aggregation pipeline
// 	const results: mostPlayedCardsData[] = await Deck.aggregate(pipeline);

// 	results.forEach((item: { cardAmount: number; colorIdentity: string; inXDecksofColor: number }) => {
// 		const cardcolor = colorcount.find(({ _id }) => _id == item.colorIdentity);

// 		if (cardcolor) item.inXDecksofColor = parseInt(((item.cardAmount / cardcolor.count) * 100).toFixed(2));
// 	});

// 	// Calculate totalPages
// 	const totalPages = Math.ceil(totalDecks[0].count / ITEMS_PER_PAGE);

// 	// Create a new object with both results and totalPages
// 	const response = {
// 		data: results,
// 		totalPages: totalPages,
// 	};

// 	// Return the new object (or assign it to a variable for further use)
// 	return response;
// };

export { mostPlayedCards };
