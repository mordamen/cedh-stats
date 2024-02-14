'use client';

import Image from 'next/image';

import { colorIconMap } from '@/constants/site';
import { Button } from './button';
import { TbArrowsUpDown, TbCaretUpDownFilled } from 'react-icons/tb';
import { AveragesByColorIdentityData, DeckStatsData, mostPlayedCardsData } from '@/types/definitions';

export const Table_MostPlayedDecks = ({ data, currentPage }: { data: mostPlayedCardsData[]; currentPage: number }) => {
	return (
		<table className='flex flex-col text-white'>
			<thead>
				<tr className='flex flow-row justify-evenly text-small-regular items-center'>
					<th className='w-1/12 '>#</th>
					<th className='w-4/12 text-start pl-4'>
						<Button>
							<span className='mr-1'>Card Name</span>
							{/* <TbArrowsUpDown /> */}
							<TbCaretUpDownFilled />
						</Button>
					</th>
					<th className='w-1/12 text-start'>
						<Button>
							<span className='mr-1'>Color Identity</span>
							<TbArrowsUpDown />
						</Button>
					</th>
					<th className='w-3/12 text-start pl-4'>Card Type</th>
					<th className='w-1/12'>
						<Button>
							<span className='mr-1'># of Decks</span>
							<TbArrowsUpDown />
						</Button>
					</th>
					<th className='w-1/12'>% of Decks</th>
					<th className='w-1/12'>% of Decks in Color</th>
				</tr>
			</thead>
			<tbody className=''>
				{data.map((card, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						<td className='w-1/12 text-center'>{(currentPage - 1) * 10 + index + 1}</td>
						<td className='w-4/12 pl-4'>{card.cardName}</td>
						<td className='w-1/12 flex flex-wrap items-center'>
							{card.colorIdentity.split('').map((color, index) => (
								<Image
									key={`mostplayed-${color}-${index}`}
									className='mx-1'
									src={colorIconMap[color]}
									width={24}
									height={24}
									alt={`${color} Mana Icon`}
								/>
							))}
						</td>
						<td className='w-3/12 pl-4'>{card.cardType}</td>
						<td className='w-1/12 text-center'>{card.cardAmount}</td>
						<td className='w-1/12 text-center'>{`${card.cardPercent} %`}</td>
						<td className='w-1/12 text-center'>{`${card.inXDecksofColor} %`}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

// -----------------------------------------------------------------------

export const Table_DeckStats = ({ data, currentPage }: { data: DeckStatsData[]; currentPage: number }) => {
	return (
		<table className='flex flex-col text-white'>
			<thead className=''>
				<tr className='flex justify-evenly text-small-regular'>
					<th className='w-1/12 '>#</th>
					<th className='w-4/12 text-start '>Deck Name</th>
					<th className='w-3/12 text-start'>Color Identity</th>
					<th className='w-1/12'># of Artifacts</th>
					<th className='w-1/12'>
						# of <br /> Lands
					</th>
					<th className='w-1/12'># of Sorceries</th>
					<th className='w-1/12'># of Instants</th>
					<th className='w-1/12'># of 'walkers</th>
					<th className='w-1/12'># of Creatures</th>
					<th className='w-1/12'># of Battles</th>
					<th className='w-1/12'>Avg Mana Value</th>
					<th className='w-1/12'>Unique Cards</th>
				</tr>
			</thead>
			<tbody className=''>
				{data.map((deck, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						<td className='w-1/12 text-center'>{(currentPage - 1) * 10 + index + 1}</td>
						<td className='w-4/12 pl-4'>{deck.deckName}</td>
						<td className='w-3/12 flex flex-wrap'>
							{deck.colorIdentity.split('').map((color, index) => (
								<Image
									key={`mostplayed-${color}-${index}`}
									className='mx-1'
									src={colorIconMap[color]}
									width={24}
									height={24}
									alt={`${color} Mana Icon`}
								/>
							))}
						</td>
						<td className='w-1/12 pl-4'>{deck.artifactCount}</td>
						<td className='w-1/12 text-center'>{deck.landCount}</td>
						<td className='w-1/12 text-center'>{deck.sorceryCount}</td>
						<td className='w-1/12 text-center'>{deck.instantCount}</td>
						<td className='w-1/12 text-center'>{deck.planeswalkerCount}</td>
						<td className='w-1/12 text-center'>{deck.creatureCount}</td>
						<td className='w-1/12 text-center'>{deck.battleCount}</td>
						<td className='w-1/12 text-center'>{deck.averageManaValue}</td>
						<td className='w-1/12 text-center'>{deck.uniqueCardCount}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

// -----------------------------------------------------------------------

export const Table_AveragesByColorIdentity = ({
	data,
	currentPage,
}: {
	data: AveragesByColorIdentityData[];
	currentPage: number;
}) => {
	return (
		<table className='flex flex-col text-white'>
			<thead className=''>
				<tr className='flex justify-evenly text-small-regular'>
					<th className='w-1/12 '>#</th>
					{/* <th className='w-4/12 text-start '>Deck Name</th> */}
					<th className='w-3/12 text-start'>Color Identity</th>
					<th className='w-1/12 text-start'>Avg # of Artifacts</th>
					<th className='w-1/12'>Avg # of Lands</th>
					<th className='w-1/12'>Avg # of Sorceries</th>
					<th className='w-1/12'>Avg # of Instants</th>
					<th className='w-1/12'>Avg # of Planeswalkers</th>
					<th className='w-1/12'>Avg # of Creatures</th>
					<th className='w-1/12'>Avg # of Battles</th>
					{/* <th className='w-1/12'>Avg Mana Value</th> */}
				</tr>
			</thead>
			<tbody className=''>
				{data.map((deck, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						<td className='w-1/12 text-center'>{(currentPage - 1) * 10 + index + 1}</td>
						<td className='w-3/12 flex flex-wrap'>
							{deck.colorIdentity.split('').map((color, index) => (
								<Image
									key={`mostplayed-${color}-${index}`}
									className='mx-1'
									src={colorIconMap[color]}
									width={24}
									height={24}
									alt={`${color} Mana Icon`}
								/>
							))}
						</td>
						<td className='w-1/12 '>{deck.averageArtifactCount}</td>
						<td className='w-1/12 text-center'>{deck.averageLandCount}</td>
						<td className='w-1/12 text-center'>{deck.averageSorceryCount}</td>
						<td className='w-1/12 text-center'>{deck.averageInstantCount}</td>
						<td className='w-1/12 text-center'>{deck.averagePlaneswalkerCount}</td>
						<td className='w-1/12 text-center'>{deck.averageCreatureCount}</td>
						<td className='w-1/12 text-center'>{deck.averageBattleCount}</td>
						{/* <td className='w-1/12 text-center'>{deck.averageManaValue}</td> */}
					</tr>
				))}
			</tbody>
		</table>
	);
};

// -----------------------------------------------------------------------

// export const GenericTable = <T extends object>({ data, columns }: TableProps<T>) => {
// 	return (
// 		<table className='flex flex-col text-white'>
// 			<thead className=''>
// 				<tr className='flex justify-evenly text-small-regular'>
// 					{columns.map((column) => (
// 						<th key={String(column.key)} className='w-auto'>
// 							{column.title}
// 						</th>
// 					))}
// 				</tr>
// 			</thead>
// 			<tbody className=''>
// 				{data.map((row, index) => (
// 					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
// 						{columns.map((column) => (
// 							<td key={String(column.key)} className='w-auto'>
// 								{column.key === 'colorIdentity' && column.render
// 									? column.render(row[column.key])
// 									: column.key === 'rowNumber'
// 									? column.render(index)
// 									: column.render
// 									? column.render(row[column.key])
// 									: String(row[column.key])}
// 							</td>
// 						))}
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// };
