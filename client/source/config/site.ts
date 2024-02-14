export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + NextUI',
	description: 'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Home',
			href: '/',
			imgURL: '/ui/home.svg',
		},
		{
			label: 'Dashbord',
			href: '/dashboard',
			imgURL: '/ui/dashboard.svg',
		},
		{
			label: 'About',
			href: '/about',
			imgURL: '/ui/user.svg',
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
	colorIcons: [
		{
			imgURL: '/mana-icons/white-mana.svg',
			label: 'W',
		},
		{
			imgURL: '/mana-icons/blue-mana.svg',
			label: 'U',
		},
		{
			imgURL: '/mana-icons/black-mana.svg',
			label: 'B',
		},
		{
			imgURL: '/mana-icons/red-mana.svg',
			label: 'R',
		},
		{
			imgURL: '/mana-icons/green-mana.svg',
			label: 'G',
		},
		{
			imgURL: '/mana-icons/colorless-mana.svg',
			label: 'C',
		},
	],
	DeckStatsHeaders: [
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
	],
	mostPlayedCardsHeaders: [
		{ accessor: 'rowNumber', label: '#', sortable: false },
		{ accessor: 'cardName', label: 'Card Name', sortable: true },
		{ accessor: 'colorIdentity', label: 'Color Identity', sortable: true },
		{ accessor: 'cardType', label: 'Card Type', sortable: true },
		{ accessor: 'cardAmount', label: '# of Decks', sortable: true },
		{ accessor: 'cardPercent', label: '% of Decks', sortable: true },
		{ accessor: 'inXDecksofColor', label: '% of Decks in Color', sortable: false },
	],
	AveragesByColorIdentityHeaders: [
		{ accessor: 'rowNumber', label: '#', sortable: false },
		{ accessor: 'colorIdentity', label: 'Color Identity', sortable: true },
		{ accessor: 'averageArtifactCount', label: 'Avg # of Arfitacts', sortable: true },
		{ accessor: 'averageLandCount', label: 'Avg # of Lands', sortable: true },
		{ accessor: 'averageSorceryCount', label: 'Avg # of Sorceries', sortable: true },
		{ accessor: 'averageInstantCount', label: 'Avg # of Instants', sortable: true },
		{ accessor: 'averagePlaneswalkerCount', label: 'Avg # of Planeswalkers', sortable: true },
		{ accessor: 'averageCreatureCount', label: 'Avg # of Creatures', sortable: true },
		{ accessor: 'averageBattleCount', label: 'Avg # of Battles', sortable: true },
	],
	AverageDeckStatsLabel: {
		averageArtifactCount: 'Avg # of Arfitacts',
		averageLandCount: 'Avg # of Lands',
		averageSorceryCount: 'Avg # of Sorceries',
		averageInstantCount: 'Avg # of Instants',
		averagePlaneswalkerCount: 'Avg # of Planeswalkers',
		averageCreatureCount: 'Avg # of Creatures',
		averageBattleCount: 'Avg # of Battles',
	},
};
