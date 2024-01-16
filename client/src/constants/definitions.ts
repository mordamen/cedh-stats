export type mostPlayedCardsData = {
	cardName: string;
	colorIdentity: string;
	cardType: string;
	cardAmount: number;
	cardPercent: number;
	inXDecksofColor: number;
};

// Define a type for mapping color characters to image source URLs
export type ColorIconMap = { [key in string]: string };

export type DeckStatsData = {
	deckName: string;
	colorIdentity: string;
	artifactCount: number;
	landCount: number;
	sorceryCount: number;
	instantCount: number;
	planeswalkerCount: number;
	creatureCount: number;
	battleCount: number;
	averageManaValue: number;
	uniqueCardCount: number;
};
