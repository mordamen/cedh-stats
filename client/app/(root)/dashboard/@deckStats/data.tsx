// 'use client';

// import Image from 'next/image';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/components/ui/tooltip';
// import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
// import { Button } from '@/src/components/ui/button';

// export type DeckData = {
// 	serialNum: string;
// 	deckName: string;
// 	colorIdentity: string;
// 	artifactCount: number;
// 	landCount: number;
// 	sorceryCount: number;
// 	instantCount: number;
// 	planeswalkerCount: number;
// 	creatureCount: number;
// 	battleCount: number;
// 	averageManaValue: number;
// 	uniqueCardCount: number;
// };

// export const DeckStats: ColumnDef<DeckData>[] = [
// 	{
// 		accessorKey: 'serialNum',
// 		// cell: ({ row }) => {
// 		// 	<span>{row.index + 1}</span>;
// 		// },
// 		cell: (info) => <span>{info.row.index + 1}</span>,
// 		header: 'S.No',
// 	},
// 	{
// 		accessorKey: 'deckName',
// 		header: ({ column }) => {
// 			return (
// 				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
// 					Deck Name
// 					<ArrowUpDown className='ml-2 h-4 w-4' />
// 				</Button>
// 			);
// 		},
// 	},
// 	{
// 		accessorKey: 'colorIdentity',
// 		header: ({ column }) => {
// 			return (
// 				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
// 					Color Identity
// 					<ArrowUpDown className='ml-2 h-4 w-4' />
// 				</Button>
// 			);
// 		},
// 		cell: ({ row }) => {
// 			const colorIdentity: string = row.getValue('colorIdentity');
// 			const formatted = colorIdentity.split('').map((color, index) => (
// 				<TooltipProvider>
// 					<Tooltip>
// 						<TooltipTrigger>
// 							<Image
// 								key={`deckstats-${color}-${index}`}
// 								src={colorIconMap[color]}
// 								width={24}
// 								height={24}
// 								alt={`${color} Mana Icon`}
// 							/>
// 						</TooltipTrigger>
// 						<TooltipContent>{`${color} Mana`}</TooltipContent>
// 					</Tooltip>
// 				</TooltipProvider>
// 			));

// 			return <div className='flex flex-wrap gap-2 '>{formatted}</div>;
// 		},
// 	},
// 	{
// 		accessorKey: 'averageManaValue',
// 		header: 'Avg Mana Value',
// 	},
// 	{
// 		accessorKey: 'artifactCount',
// 		header: 'Artifacts in Deck',
// 	},
// 	{
// 		accessorKey: 'landCount',
// 		header: 'Lands in Deck',
// 	},
// 	{
// 		accessorKey: 'sorceryCount',
// 		header: 'Sorceries in Deck',
// 	},
// 	{
// 		accessorKey: 'instantCount',
// 		header: 'Instants in Deck',
// 	},
// 	{
// 		accessorKey: 'planeswalkerCount',
// 		header: 'Planeswalkers in Deck',
// 	},
// 	{
// 		accessorKey: 'creatureCount',
// 		header: 'Creatures in Deck',
// 	},
// 	{
// 		accessorKey: 'battleCount',
// 		header: 'Battles in Deck',
// 	},
// 	{
// 		accessorKey: 'uniqueCardCount',
// 		header: 'Unique Cards/Deck',
// 	},
// ];
