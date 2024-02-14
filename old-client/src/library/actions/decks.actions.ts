// server/actions/decks.ts
'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import Deck from '../models/decklist.model';
import { connectToDB } from '../../utilities';

// Define the structure of each deck item
interface DeckData {
	_id: string;
	count: number;
}

export const decksByColorIdentityHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectToDB();
	try {
		const results = await Deck.aggregate([
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
					colorWeight: 0,
					// _id: 0,
				},
			},
		]);

		res.status(200).json(results);
		return results;
	} catch (error) {
		console.error('Error in decksByColorIdentityHandler:', error);
		res.status(500).json({ error: 'Internal Server Error' });
		throw error; // Add this line to propagate the error in case of an exception
	}
};

// Function to aggregate decks count by global color identity
export const decksByGlobalColorIdentityHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	connectToDB();
	try {
		// Call the function to get the result
		const results: DeckData[] = await decksByColorIdentityHandler(req, res);

		// Function to calculate the summary of color counts
		const colorCountSummary = (dataArray: DeckData[]): DeckData[] => {
			// Object to store the summary of color counts
			const summary: { [key: string]: number } = {};

			// Loop through each item in the data array
			dataArray.forEach((item) => {
				// Extract the color combination from the current item
				const combination = item._id;

				// Nested loop to compare each item with every other item
				dataArray.forEach(({ _id, count }) => {
					// Convert color combinations to arrays for comparison
					const combArr = combination.split('');
					const checkedCombArr = _id.split('');

					// Check if the arrays have common elements
					const check = checkedCombArr.filter((key) => combArr.includes(key));

					// If the arrays match, update the summary
					if (check.join('') === combArr.join('')) {
						if (!summary[combination]) {
							summary[combination] = 0;
						}
						summary[combination] += count;
					}
				});
			});

			// Convert the summary object to an array of DeckData objects
			const summaryArray: DeckData[] = Object.keys(summary).map((key) => ({
				_id: key,
				count: summary[key],
			}));

			return summaryArray;
		};

		// Calculate the color count summary using the results
		const result = colorCountSummary(results);

		// Return the final result
		return res.status(200).json(result); // Fix: Return the result
	} catch (error) {
		console.error('Error in decksByGlobalColorIdentityHandler:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export async function deckStatsHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const uniqueCards = await Deck.aggregate([
			// ... (your existing aggregation pipeline for uniqueCards)
		]);

		const deckStats = await Deck.aggregate([
			// ... (your existing aggregation pipeline for deckStats)
		]);

		const mergedResults = deckStats.map((deckStats) => {
			const matchingUniqueCards = uniqueCards.find((uniqueCards) => uniqueCards._id.includes(deckStats.deckName));

			return {
				...deckStats,
				uniqueCardCount: matchingUniqueCards ? matchingUniqueCards.uniqueCardsCount : 0,
			};
		});

		res.status(200).json(mergedResults);
	} catch (error) {
		console.error('Error in deckStatsHandler:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

export async function averagesPerDeckHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const results = await Deck.aggregate([
			// ... (your existing aggregation pipeline for averagesPerDeck)
		]);

		res.status(200).json(results);
	} catch (error) {
		console.error('Error in averagesPerDeckHandler:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

export async function averagesByColorIdentityHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const results = await Deck.aggregate([
			// ... (your existing aggregation pipeline for averagesByColorIdentity)
		]);

		res.status(200).json(results);
	} catch (error) {
		console.error('Error in averagesByColorIdentityHandler:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
