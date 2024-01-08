const Deck = require('../models/mongoDB/decklist.model');
const { decksByGlobalColorIdentity } = require('./decks.service');

const mostPlayedCards = async (cardType, colorIdentity) => {
	const totalDecks = await Deck.aggregate([
		{
			$count: 'count',
		},
	]);

	const colorcount = await decksByGlobalColorIdentity();

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
	];

	if (cardType) {
		pipeline.push({
			$match: {
				'cards.v.card.type_line': new RegExp(`^${cardType}$`, 'i'),
			},
		});
	}

	if (colorIdentity && colorIdentity.length > 0) {
		pipeline.push({
			$match: {
				'cards.v.card.color_identity': { $all: colorIdentity },
			},
		});
	}

	pipeline.push(
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
			$sort: {
				cardAmount: -1,
			},
		}
	);

	console.log(cardType, colorIdentity);

	// Run the aggregation pipeline
	const results = await Deck.aggregate(pipeline);

	results.forEach((item) => {
		const cardcolor = colorcount.find(({ _id }) => _id == item[colorIdentity]);
		if (cardcolor) item.inXDecksofColor = parseInt(((item[inNumberOfDecks] / cardcolor.count) * 100).toFixed(2));
	});

	return results;
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
