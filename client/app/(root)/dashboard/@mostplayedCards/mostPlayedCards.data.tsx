'use client';

import { ColumnDef } from '@tanstack/react-table';

export type CardData = {
	cardName: string;
	colorIdentity: string;
	cardType: string; // New field for all types
	cardAmount: number;
	cardPercent: number;
};

// Define a type for mapping color characters to image source URLs
type ColorIconMap = { [key in string]: string };

// Create the colorIconMap with correct types (image URLs)
const colorIconMap: ColorIconMap = {
	W: '/assets/mana-icons/white-mana.svg',
	U: '/assets/mana-icons/blue-mana.svg',
	B: '/assets/mana-icons/black-mana.svg',
	R: '/assets/mana-icons/red-mana.svg',
	G: '/assets/mana-icons/green-mana.svg',
	C: '/assets/mana-icons/colorless-mana.svg',
};

export const MostPlayedCards: ColumnDef<CardData>[] = [
	{
		accessorKey: 'cardName',
		header: 'Card Name',
	},
	{
		accessorKey: 'cardType',
		header: 'Card Type',
	},
	{
		accessorKey: 'colorIdentity',
		header: 'Color Identity',
		cell: ({ row }) => {
			const colorIdentity: string = row.getValue('colorIdentity');
			const formatted = colorIdentity
				.split('')
				.map((color, index) => (
					<img key={`color-${color}-${index}`} src={colorIconMap[color]} width='24' alt={`${color} Mana Icon`} />
				));

			return <div className='flex flex-wrap gap-2 '>{formatted}</div>;
		},
	},
	{
		accessorKey: 'cardAmount',
		header: 'In X Decks',
	},
	{
		accessorKey: 'cardPercent',
		header: '% of Decks',
		cell: ({ row }) => {
			const data: string = row.getValue('cardPercent');
			const formatted = `${data} %`;

			return <div className='text-center font-medium'>{formatted}</div>;
		},
	},
];
