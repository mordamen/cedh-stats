import { renderColorIdentity } from '../lib/utils';
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

export const DeckStatsHeaders = (currentPage: number) => [
	{ key: 'rowNumber', title: '#', render: (index: number) => String((currentPage - 1) * 10 + index + 1) },
	{ key: 'deckName', title: 'Deck Name' },
	{ key: 'colorIdentity', title: 'Color Identity', render: renderColorIdentity },
	{ key: 'artifactCount', title: '# of Artifacts' },
	{ key: 'landCount', title: '# of Lands' },
	{ key: 'sorceryCount', title: '# of Sorceries' },
	{ key: 'instantCount', title: '# of Instants' },
	{ key: 'planeswalkerCount', title: '# of Planeswalkers' },
	{ key: 'creatureCount', title: '# of Creatures' },
	{ key: 'battleCount', title: '# of Battles' },
	{ key: 'averageManaValue', title: 'Avg Mana Value' },
	{ key: 'uniqueCardCount', title: '# of Unique Cards' },
	,
];

export const mostPlayedCardsHeaders = (currentPage: number) => [
	{ key: 'rowNumber', title: '#', render: (index: number) => String((currentPage - 1) * 10 + index + 1) },
	{ key: 'cardName', title: 'Card Name' },
	{ key: 'colorIdentity', title: 'Color Identity', render: renderColorIdentity },
	{ key: 'cardType', title: 'Card Type' },
	{ key: 'cardAmount', title: '# of Decks' },
	{ key: 'cardPercent', title: '% of Decks' },
	{ key: 'inXDecksofColor', title: '% of Decks in Color' },
];

export const AverageDeckStatsLabel: any = {
	averageArtifactCount: 'Avg # of Arfitacts',
	averageLandCount: 'Avg # of Lands',
	averageSorceryCount: 'Avg # of Sorceries',
	averageInstantCount: 'Avg # of Instants',
	averagePlaneswalkerCount: 'Avg # of Planeswalkers',
	averageCreatureCount: 'Avg # of Creatures',
	averageBattleCount: 'Avg # of Battles',
};

export const decksByColorIdentityLabel: any = [
	{
		_id: 'W',
		count: 6,
	},
	{
		_id: 'U',
		count: 6,
	},
	{
		_id: 'B',
		count: 4,
	},
	{
		_id: 'R',
		count: 5,
	},
	{
		_id: 'G',
		count: 3,
	},
	{
		_id: 'WU',
		count: 2,
	},
	{
		_id: 'WB',
		count: 1,
	},
	{
		_id: 'WR',
		count: 4,
	},
	{
		_id: 'WG',
		count: 6,
	},
	{
		_id: 'UB',
		count: 7,
	},
	{
		_id: 'UR',
		count: 11,
	},
	{
		_id: 'UG',
		count: 8,
	},
	{
		_id: 'BR',
		count: 7,
	},
	{
		_id: 'BG',
		count: 9,
	},
	{
		_id: 'RG',
		count: 2,
	},
	{
		_id: 'WUB',
		count: 14,
	},
	{
		_id: 'WUR',
		count: 4,
	},
	{
		_id: 'WUG',
		count: 7,
	},
	{
		_id: 'WBR',
		count: 3,
	},
	{
		_id: 'WBG',
		count: 11,
	},
	{
		_id: 'WRG',
		count: 9,
	},
	{
		_id: 'UBR',
		count: 20,
	},
	{
		_id: 'UBG',
		count: 16,
	},
	{
		_id: 'URG',
		count: 9,
	},
	{
		_id: 'BRG',
		count: 6,
	},
	{
		_id: 'WUBR',
		count: 4,
	},
	{
		_id: 'WUBG',
		count: 10,
	},
	{
		_id: 'WURG',
		count: 6,
	},
	{
		_id: 'WBRG',
		count: 8,
	},
	{
		_id: 'UBRG',
		count: 8,
	},
	{
		_id: 'WUBRG',
		count: 18,
	},
];
