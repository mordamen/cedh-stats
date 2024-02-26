export {};
const Deck = require('../models/mongoDB/decklist.model');

const ITEMS_PER_PAGE = 10;

// Function to aggregate averages of card types
/**
 * Calculates the average counts of different card types per deck.
 * @returns {Promise<Array>} The results of the aggregation query.
 */
const averagesPerDeck = () => {
	const results = Deck.aggregate([
		{
			$project: {
				card: {
					$objectToArray: '$Decklist',
				},
				Title: 1,
			},
		},
		{
			$unwind: {
				path: '$card',
			},
		},
		{
			$group: {
				_id: '$Title',
				artifactCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Artifact/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				landCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Land/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				sorceryCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Sorcery/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				instantCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Instant/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				planeswalkerCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Planeswalker/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				creatureCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Creature/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				battleCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Battle/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
			},
		},
		{
			$group: {
				_id: null,
				averageArtifactCount: {
					$avg: '$artifactCount',
				},
				averageLandCount: {
					$avg: '$landCount',
				},
				averageSorceryCount: {
					$avg: '$sorceryCount',
				},
				averageInstantCount: {
					$avg: '$instantCount',
				},
				averagePlaneswalkerCount: {
					$avg: '$planeswalkerCount',
				},
				averageCreatureCount: {
					$avg: '$creatureCount',
				},
				averageBattleCount: {
					$avg: '$battleCount',
				},
			},
		},
		{
			$project: {
				_id: 0, // Exclude the _id field from the final result
				averageArtifactCount: { $round: ['$averageArtifactCount', 2] }, // Round to 2 decimal places
				averageLandCount: { $round: ['$averageLandCount', 2] },
				averageSorceryCount: { $round: ['$averageSorceryCount', 2] },
				averageInstantCount: { $round: ['$averageInstantCount', 2] },
				averagePlaneswalkerCount: {
					$round: ['$averagePlaneswalkerCount', 2],
				},
				averageCreatureCount: { $round: ['$averageCreatureCount', 2] },
				averageBattleCount: { $round: ['$averageBattleCount', 2] },
			},
		},
	]);

	return results;
};

/**
 * Calculates the averages of various card types by color identity.
 * @param {number} page - The page number.
 * @param {string} query - The search query.
 * @returns {Promise<Object>} - The response object containing the calculated averages and total pages.
 */
const averagesByColorIdentity = async (page: number, query: any) => {
	const offset = (page - 1) * ITEMS_PER_PAGE;

	const results = await Deck.aggregate([
		{
			$project: {
				card: {
					$objectToArray: '$Decklist',
				},
				'Color Identity': 1,
				Title: 1,
			},
		},
		{
			$unwind: {
				path: '$card',
			},
		},
		{
			$group: {
				_id: {
					title: '$Title',
					color: '$Color Identity',
				},
				artifactCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Artifact/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				landCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Land/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				sorceryCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Sorcery/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				instantCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Instant/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				planeswalkerCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Planeswalker/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				creatureCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Creature/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
				battleCount: {
					$sum: {
						$cond: [
							{
								$regexMatch: {
									input: '$card.v.card.type_line',
									regex: /Battle/i,
								},
							},
							'$card.v.quantity',
							0,
						],
					},
				},
			},
		},
		{
			$group: {
				_id: '$_id.color',
				averageArtifactCount: {
					$avg: '$artifactCount',
				},
				averageLandCount: {
					$avg: '$landCount',
				},
				averageSorceryCount: {
					$avg: '$sorceryCount',
				},
				averageInstantCount: {
					$avg: '$instantCount',
				},
				averagePlaneswalkerCount: {
					$avg: '$planeswalkerCount',
				},
				averageCreatureCount: {
					$avg: '$creatureCount',
				},
				averageBattleCount: {
					$avg: '$battleCount',
				},
			},
		},
		{
			$addFields: {
				colorWeight: {
					$switch: {
						branches: [
							// Assign weights based on color identity
							{
								case: {
									$eq: ['$_id', 'W'],
								},
								then: 1,
							},
							{
								case: {
									$eq: ['$_id', 'U'],
								},
								then: 2,
							},
							{
								case: {
									$eq: ['$_id', 'B'],
								},
								then: 3,
							},
							{
								case: {
									$eq: ['$_id', 'R'],
								},
								then: 4,
							},
							{
								case: {
									$eq: ['$_id', 'G'],
								},
								then: 5,
							},
							{
								case: {
									$eq: ['$_id', 'WU'],
								},
								then: 6,
							},
							{
								case: {
									$eq: ['$_id', 'WB'],
								},
								then: 7,
							},
							{
								case: {
									$eq: ['$_id', 'WR'],
								},
								then: 8,
							},
							{
								case: {
									$eq: ['$_id', 'WG'],
								},
								then: 9,
							},
							{
								case: {
									$eq: ['$_id', 'UB'],
								},
								then: 10,
							},
							{
								case: {
									$eq: ['$_id', 'UR'],
								},
								then: 11,
							},
							{
								case: {
									$eq: ['$_id', 'UG'],
								},
								then: 12,
							},
							{
								case: {
									$eq: ['$_id', 'BR'],
								},
								then: 13,
							},
							{
								case: {
									$eq: ['$_id', 'BG'],
								},
								then: 14,
							},
							{
								case: {
									$eq: ['$_id', 'RG'],
								},
								then: 15,
							},
							{
								case: {
									$eq: ['$_id', 'WUB'],
								},
								then: 16,
							},
							{
								case: {
									$eq: ['$_id', 'WUR'],
								},
								then: 17,
							},
							{
								case: {
									$eq: ['$_id', 'WUG'],
								},
								then: 18,
							},
							{
								case: {
									$eq: ['$_id', 'WBR'],
								},
								then: 19,
							},
							{
								case: {
									$eq: ['$_id', 'WBG'],
								},
								then: 20,
							},
							{
								case: {
									$eq: ['$_id', 'WRG'],
								},
								then: 21,
							},
							{
								case: {
									$eq: ['$_id', 'UBR'],
								},
								then: 22,
							},
							{
								case: {
									$eq: ['$_id', 'UBG'],
								},
								then: 23,
							},
							{
								case: {
									$eq: ['$_id', 'URG'],
								},
								then: 24,
							},
							{
								case: {
									$eq: ['$_id', 'BRG'],
								},
								then: 25,
							},
							{
								case: {
									$eq: ['$_id', 'WUBR'],
								},
								then: 26,
							},
							{
								case: {
									$eq: ['$_id', 'WUBG'],
								},
								then: 27,
							},
							{
								case: {
									$eq: ['$_id', 'WURG'],
								},
								then: 28,
							},
							{
								case: {
									$eq: ['$_id', 'WBRG'],
								},
								then: 29,
							},
							{
								case: {
									$eq: ['$_id', 'UBRG'],
								},
								then: 30,
							},
							{
								case: {
									$eq: ['$_id', 'WUBRG'],
								},
								then: 31,
							},
							// Add more branches for other color combinations
						],

						default: 99, // Default weight for unknown color identity
					},
				},
			},
		},
		{
			$sort: {
				colorWeight: 1, // Sorting by colorWeight in ascending order
			},
		},
		{
			$project: {
				_id: 0,
				colorIdentity: '$_id',
				averageArtifactCount: {
					$round: ['$averageArtifactCount', 2],
				},
				// Round to 2 decimal places
				averageLandCount: {
					$round: ['$averageLandCount', 2],
				},
				averageSorceryCount: {
					$round: ['$averageSorceryCount', 2],
				},
				averageInstantCount: {
					$round: ['$averageInstantCount', 2],
				},
				averagePlaneswalkerCount: {
					$round: ['$averagePlaneswalkerCount', 2],
				},
				averageCreatureCount: {
					$round: ['$averageCreatureCount', 2],
				},
				averageBattleCount: {
					$round: ['$averageBattleCount', 2],
				},
			},
		},
		{
			$match: {
				$or: [
					{ colorIdentity: { $regex: new RegExp(query, 'i') } },
					{ averageArtifactCount: { $regex: new RegExp(query, 'i') } },
					{ averageLandCount: { $regex: new RegExp(query, 'i') } },
					{ averageSorceryCount: { $regex: new RegExp(query, 'i') } },
					{ averageInstantCount: { $regex: new RegExp(query, 'i') } },
					{ averagePlaneswalkerCount: { $regex: new RegExp(query, 'i') } },
					{ averageCreatureCount: { $regex: new RegExp(query, 'i') } },
					{ averageBattleCount: { $regex: new RegExp(query, 'i') } },
					// { averageManaValue: { $regex: new RegExp(query, 'i') } },
				],
			},
		},
		{ $skip: offset }, // Skip initial results
		{ $limit: ITEMS_PER_PAGE }, // Limit results per page
	]);

	const totalPages = Math.ceil(31 / ITEMS_PER_PAGE);

	const response = {
		data: results,
		totalPages: totalPages,
	};

	return response;
};

// Function to aggregate decks by color identity
/**
 * Retrieves the count of decks grouped by color identity and assigns a weight to each color identity.
 *
 * @returns {Promise<Array>} The array of decks grouped by color identity with their respective counts and weights.
 */
const decksByColorIdentity = () => {
	const results = Deck.aggregate([
		{
			$group: {
				// Grouping decks by color identity
				_id: '$Color Identity',
				count: { $sum: 1 },
			},
		},
		{
			$addFields: {
				colorWeight: {
					$switch: {
						branches: [
							// Assign weights based on color identity
							{ case: { $eq: ['$_id', 'W'] }, then: 1 },
							{ case: { $eq: ['$_id', 'U'] }, then: 2 },
							{ case: { $eq: ['$_id', 'B'] }, then: 3 },
							{ case: { $eq: ['$_id', 'R'] }, then: 4 },
							{ case: { $eq: ['$_id', 'G'] }, then: 5 },
							{ case: { $eq: ['$_id', 'WU'] }, then: 6 },
							{ case: { $eq: ['$_id', 'WB'] }, then: 7 },
							{ case: { $eq: ['$_id', 'WR'] }, then: 8 },
							{ case: { $eq: ['$_id', 'WG'] }, then: 9 },
							{ case: { $eq: ['$_id', 'UB'] }, then: 10 },
							{ case: { $eq: ['$_id', 'UR'] }, then: 11 },
							{ case: { $eq: ['$_id', 'UG'] }, then: 12 },
							{ case: { $eq: ['$_id', 'BR'] }, then: 13 },
							{ case: { $eq: ['$_id', 'BG'] }, then: 14 },
							{ case: { $eq: ['$_id', 'RG'] }, then: 15 },
							{ case: { $eq: ['$_id', 'WUB'] }, then: 16 },
							{ case: { $eq: ['$_id', 'WUR'] }, then: 17 },
							{ case: { $eq: ['$_id', 'WUG'] }, then: 18 },
							{ case: { $eq: ['$_id', 'WBR'] }, then: 19 },
							{ case: { $eq: ['$_id', 'WBG'] }, then: 20 },
							{ case: { $eq: ['$_id', 'WRG'] }, then: 21 },
							{ case: { $eq: ['$_id', 'UBR'] }, then: 22 },
							{ case: { $eq: ['$_id', 'UBG'] }, then: 23 },
							{ case: { $eq: ['$_id', 'URG'] }, then: 24 },
							{ case: { $eq: ['$_id', 'BRG'] }, then: 25 },
							{ case: { $eq: ['$_id', 'WUBR'] }, then: 26 },
							{ case: { $eq: ['$_id', 'WUBG'] }, then: 27 },
							{ case: { $eq: ['$_id', 'WURG'] }, then: 28 },
							{ case: { $eq: ['$_id', 'WBRG'] }, then: 29 },
							{ case: { $eq: ['$_id', 'UBRG'] }, then: 30 },
							{ case: { $eq: ['$_id', 'WUBRG'] }, then: 31 },
							// Add more branches for other color combinations
						],
						default: 99, // Default weight for unknown color identity
					},
				},
			},
		},
		{
			$sort: {
				colorWeight: 1, // Sorting by colorWeight in ascending order
				// Add more sorting conditions if needed
			},
		},
		{
			$project: {
				_id: 0,
				name: '$_id',
				value: '$count',
			},
		},
	]);

	return results;
};

// Function to aggregate decks by global color identity
/**
 * Retrieves the summary of decks by global color identity.
 * @returns {Array} The summary array containing the name and value of each color combination.
 */
const decksByGlobalColorIdentity = async () => {
	const results = await decksByColorIdentity(); // Call the function to get the result

	const colorCountSummary = (dataArray: any) => {
		// const summary = {};

		const summary: { [key: string]: number } = {};

		dataArray.forEach((item: any) => {
			const combination = item.name;
			dataArray.forEach(({ name, value }: { name: string; value: any }) => {
				const combArr = combination.split('');
				const checkedCombArr = name.split('');
				const check = checkedCombArr.filter((key) => combArr.includes(key));
				if (check.join('') === combArr.join('')) {
					if (!summary[combination]) {
						summary[combination] = 0;
					}
					summary[combination] += value;
				}
			});
		});

		const summaryArray: { name: string; value: any }[] = [];

		Object.keys(summary).forEach((key) => summaryArray.push({ name: key, value: summary[key] }));

		return summaryArray;
	};

	const result = colorCountSummary(results);

	return result;
};

/**
 * Retrieves deck statistics based on the provided parameters.
 *
 * @param {number} page - The page number for pagination.
 * @param {string} query - The search query to filter decks.
 * @param {string} colorID - The color identity to filter decks.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the deck statistics and total number of pages.
 */
const deckStats = async (page = 1, query: any, colorID: string) => {
	const offset = (page - 1) * ITEMS_PER_PAGE;

	let matchConditions: Array<any> = [];

	if (colorID) {
		matchConditions.push({ colorIdentity: { $eq: colorID } });
	}

	let queryConditions = [{ deckName: { $regex: new RegExp(query, 'i') } }];

	if (queryConditions.length > 0) {
		matchConditions.push({ $or: queryConditions });
	}

	const [totalDecks, uniqueCards, data] = await Promise.all([
		Deck.aggregate([{ $count: 'count' }]),
		Deck.aggregate([
			{
				$project: {
					Title: 1,
					cards: { $objectToArray: '$Decklist' },
				},
			},
			{ $unwind: '$cards' },
			{
				$group: {
					_id: '$cards.k',
					decks: { $addToSet: '$Title' },
					count: { $sum: 1 },
				},
			},
			{ $match: { count: 1 } },
			{
				$group: {
					_id: '$decks',
					uniqueCards: { $addToSet: '$_id' },
					uniqueCardsCount: { $sum: 1 },
				},
			},
		]),
		Deck.aggregate([
			{
				$project: {
					card: { $objectToArray: '$Decklist' },
					'Color Identity': 1,
					Title: 1,
				},
			},
			{
				$addFields: {
					key: 0,
				},
			},
			{ $unwind: '$card' },
			{
				$group: {
					_id: '$Title',
					key: { $first: '$key' },
					colorIdentity: { $first: '$Color Identity' },
					artifactCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Artifact/i } }, '$card.v.quantity', 0],
						},
					},
					landCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Land/i } }, '$card.v.quantity', 0],
						},
					},
					sorceryCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Sorcery/i } }, '$card.v.quantity', 0],
						},
					},
					instantCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Instant/i } }, '$card.v.quantity', 0],
						},
					},
					planeswalkerCount: {
						$sum: {
							$cond: [
								{ $regexMatch: { input: '$card.v.card.type_line', regex: /Planeswalker/i } },
								'$card.v.quantity',
								0,
							],
						},
					},
					creatureCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Creature/i } }, '$card.v.quantity', 0],
						},
					},
					battleCount: {
						$sum: {
							$cond: [{ $regexMatch: { input: '$card.v.card.type_line', regex: /Battle/i } }, '$card.v.quantity', 0],
						},
					},
					averageManaValue: { $avg: '$card.v.card.cmc' },
				},
			},
			{
				$project: {
					_id: 0,
					key: 1,
					deckName: '$_id',
					colorIdentity: 1,
					artifactCount: 1,
					landCount: 1,
					sorceryCount: 1,
					instantCount: 1,
					planeswalkerCount: 1,
					creatureCount: 1,
					battleCount: 1,
					averageManaValue: { $round: ['$averageManaValue', 2] },
				},
			},
			{
				$match: {
					$and: matchConditions,
				},
			},
			{ $sort: { deckName: -1 } },
			{ $skip: offset },
			{ $limit: ITEMS_PER_PAGE },
		]),
	]);

	let count = 1;
	data.forEach((item: any) => {
		item.key = count++;
	});

	const mergedResults = data.map((data: any) => {
		const matchingUniqueCards = uniqueCards.find((uniqueCards: any) => uniqueCards._id.includes(data.deckName));
		return {
			...data,
			uniqueCardCount: matchingUniqueCards ? matchingUniqueCards.uniqueCardsCount : 0,
		};
	});

	const totalPages = Math.ceil(totalDecks[0].count / ITEMS_PER_PAGE);

	return {
		data: mergedResults,
		totalPages: totalPages,
	};
};

// module.exports = {
// 	averagesPerDeck,
// 	averagesByColorIdentity,
// 	decksByColorIdentity,
// 	decksByGlobalColorIdentity,
// 	deckStats,
// };

export { averagesPerDeck, averagesByColorIdentity, decksByColorIdentity, decksByGlobalColorIdentity, deckStats };
