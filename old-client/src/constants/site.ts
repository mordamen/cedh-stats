import { ColorIconMap } from '@/types/definitions';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + NextUI',
	description: 'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Docs',
			href: '/docs',
		},
		{
			label: 'Pricing',
			href: '/pricing',
		},
		{
			label: 'Blog',
			href: '/blog',
		},
		{
			label: 'About',
			href: '/about',
		},
	],
	navMenuItems: [
		{
			label: 'Profile',
			href: '/profile',
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Projects',
			href: '/projects',
		},
		{
			label: 'Team',
			href: '/team',
		},
		{
			label: 'Calendar',
			href: '/calendar',
		},
		{
			label: 'Settings',
			href: '/settings',
		},
		{
			label: 'Help & Feedback',
			href: '/help-feedback',
		},
		{
			label: 'Logout',
			href: '/logout',
		},
	],
	links: {
		github: 'https://github.com/nextui-org/nextui',
		twitter: 'https://twitter.com/getnextui',
		docs: 'https://nextui.org',
		discord: 'https://discord.gg/9b6yyZKmH4',
		sponsor: 'https://patreon.com/jrgarciadev',
	},
};

export const tabs = [
	{
		id: 'photos',
		label: 'Photos',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		id: 'music',
		label: 'Music',
		content:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{
		id: 'videos',
		label: 'Videos',
		content:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
];

export const navLinks = [
	{
		imgURL: '/assets/ui/home.svg',
		route: '/',
		label: 'Home',
	},
	{
		imgURL: '/assets/ui/dashboard.svg',
		route: '/dashboard',
		label: 'Dashboard',
	},
	{
		imgURL: '/assets/ui/user.svg',
		route: '/profile',
		label: 'Profile',
	},
];

export const colorIcons = [
	{
		imgURL: '/assets/mana-icons/white-mana.svg',
		label: 'W',
	},
	{
		imgURL: '/assets/mana-icons/blue-mana.svg',
		label: 'U',
	},
	{
		imgURL: '/assets/mana-icons/black-mana.svg',
		label: 'B',
	},
	{
		imgURL: '/assets/mana-icons/red-mana.svg',
		label: 'R',
	},
	{
		imgURL: '/assets/mana-icons/green-mana.svg',
		label: 'G',
	},
	{
		imgURL: '/assets/mana-icons/colorless-mana.svg',
		label: 'C',
	},
];

export const colorIconMap: ColorIconMap = {
	W: '/assets/mana-icons/white-mana.svg',
	U: '/assets/mana-icons/blue-mana.svg',
	B: '/assets/mana-icons/black-mana.svg',
	R: '/assets/mana-icons/red-mana.svg',
	G: '/assets/mana-icons/green-mana.svg',
	C: '/assets/mana-icons/colorless-mana.svg',
};

export const DeckStatsHeaders = [
	{ accessor: 'rowNumber', label: '#', sortable: false },
	{ accessor: 'deckName', label: 'Deck Name', sortable: true },
	{ accessor: 'colorIdentity', label: 'Color Identity', sortable: true },
	{ accessor: 'artifactCount', label: '# of Artifacts', sortable: true },
	{ accessor: 'landCount', label: '# of Lands', sortable: true },
	{ accessor: 'sorceryCount', label: '# of Sorceries', sortable: true },
	{ accessor: 'instantCount', label: '# of Instants', sortable: true },
	{ accessor: 'planeswalkerCount', label: '# of Planeswalkers', sortable: true },
	{ accessor: 'creatureCount', label: '# of Creatures', sortable: true },
	{ accessor: 'battleCount', label: '# of Battles', sortable: true },
	{ accessor: 'averageManaValue', label: 'Avg Mana Value', sortable: true },
	{ accessor: 'uniqueCardCount', label: '# of Unique Cards', sortable: true },
	,
];

export const mostPlayedCardsHeaders = [
	{ accessor: 'rowNumber', label: '#', sortable: false },
	{ accessor: 'cardName', label: 'Card Name', sortable: true },
	{ accessor: 'colorIdentity', label: 'Color Identity', sortable: true },
	{ accessor: 'cardType', label: 'Card Type', sortable: true },
	{ accessor: 'cardAmount', label: '# of Decks', sortable: true },
	{ accessor: 'cardPercent', label: '% of Decks', sortable: true },
	{ accessor: 'inXDecksofColor', label: '% of Decks in Color', sortable: false },
];

export const AveragesByColorIdentityHeaders = [
	{ accessor: 'rowNumber', label: '#', sortable: false },
	{ accessor: 'colorIdentity', label: 'Color Identity', sortable: true },
	{ accessor: 'averageArtifactCount', label: 'Avg # of Arfitacts', sortable: true },
	{ accessor: 'averageLandCount', label: 'Avg # of Lands', sortable: true },
	{ accessor: 'averageSorceryCount', label: 'Avg # of Sorceries', sortable: true },
	{ accessor: 'averageInstantCount', label: 'Avg # of Instants', sortable: true },
	{ accessor: 'averagePlaneswalkerCount', label: 'Avg # of Planeswalkers', sortable: true },
	{ accessor: 'averageCreatureCount', label: 'Avg # of Creatures', sortable: true },
	{ accessor: 'averageBattleCount', label: 'Avg # of Battles', sortable: true },
];

export const AverageDeckStatsLabel = {
	averageArtifactCount: 'Avg # of Arfitacts',
	averageLandCount: 'Avg # of Lands',
	averageSorceryCount: 'Avg # of Sorceries',
	averageInstantCount: 'Avg # of Instants',
	averagePlaneswalkerCount: 'Avg # of Planeswalkers',
	averageCreatureCount: 'Avg # of Creatures',
	averageBattleCount: 'Avg # of Battles',
};
