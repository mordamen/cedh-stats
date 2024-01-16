import { ColorIconMap } from './definitions';

export const sidebarLinks = [
	{
		imgURL: '/assets/home.svg',
		route: '/',
		label: 'Home',
	},
	{
		imgURL: '/assets/search.svg',
		route: '/dashboard',
		label: 'Dashboard',
	},
	{
		imgURL: '/assets/user.svg',
		route: '/profile',
		label: 'Profile',
	},
];

// Create the colorIconMap with correct types (image URLs)
export const colorIconMap: ColorIconMap = {
	W: '/assets/mana-icons/white-mana.svg',
	U: '/assets/mana-icons/blue-mana.svg',
	B: '/assets/mana-icons/black-mana.svg',
	R: '/assets/mana-icons/red-mana.svg',
	G: '/assets/mana-icons/green-mana.svg',
	C: '/assets/mana-icons/colorless-mana.svg',
};

export const DeckStatsHeaders = [
	'deckName',
	'colorIdentity',
	'artifactCount',
	'landCount',
	'sorceryCount',
	'instantCount',
	'planeswalkerCount',
	'creatureCount',
	'battleCount',
	'averageManaValue',
	'uniqueCardCount',
];

export const mostPlayedCardsHeaders = [
	'cardName',
	'colorIdentity',
	'cardType',
	'cardAmount',
	'cardPercent',
	'inXDecksofColor',
];

export const mostPlayedCardsHeadersAlias = {
	cardName: 'Card Name',
	colorIdentity: 'Color Identity',
	cardType: 'Card Type',
	cardAmount: '# of Decks',
	cardPercent: '% of Decks',
	inXDecksofColor: '% of Decks in Color',
};
