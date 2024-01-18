import { FC } from 'react';
import Image from 'next/image';
import { colorIconMap } from '@/src/constants';
import { DeckStatsData, mostPlayedCardsData } from '@/src/constants/definitions';

export const Table_MostPlayedDecks = ({ data }: { data: mostPlayedCardsData[] }) => {
	return (
		<table className='flex flex-col text-white'>
			<thead className=''>
				<tr className='flex justify-evenly text-small-regular'>
					<th className='w-1/12 '>#</th>
					<th className='w-4/12 text-start pl-4'>Card Name</th>
					<th className='w-1/12'>Color Identity</th>
					<th className='w-3/12 text-start pl-4'>Card Type</th>
					<th className='w-1/12'># of Decks</th>
					<th className='w-1/12'>% of Decks</th>
					<th className='w-1/12'>% of Decks in Color</th>
				</tr>
			</thead>
			<tbody className=''>
				{data.map((card, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						<td className='w-1/12 text-center'>{index + 1}</td>
						<td className='w-4/12 pl-4'>{card.cardName}</td>
						<td className='w-1/12 flex flex-wrap'>
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

export const Table_DeckStats = ({ data }: { data: DeckStatsData[] }) => {
	return (
		<table className='flex flex-col text-white'>
			<thead className=''>
				<tr className='flex justify-evenly text-small-regular'>
					<th className='w-1/12 '>#</th>
					<th className='w-4/12 text-start '>Deck Name</th>
					<th className='w-3/12 text-start'>Color Identity</th>
					<th className='w-1/12'># of Lands </th>
					<th className='w-1/12'># of Sorceries</th>
					<th className='w-1/12'># of Instants</th>
					<th className='w-1/12'># of Planeswalkers</th>
					<th className='w-1/12'># of Creatures</th>
					<th className='w-1/12'># of Battles</th>
					<th className='w-1/12'>Avg Mana Value</th>
					<th className='w-1/12'>Unique Card #</th>
				</tr>
			</thead>
			<tbody className=''>
				{data.map((deck, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						<td className='w-1/12 text-center'>{index + 1}</td>
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
// Declare generic types at the top level
type T = any; // Substitute with the actual type of your data
type U = keyof T;
interface Props<T, U extends keyof T> {
	data: T[];
	headers: U[];
}

export const GenericTable: FC<Props<T, U>> = ({ data, headers }) => {
	return (
		<table className='flex flex-col text-white'>
			<thead className=''>
				<tr className='flex justify-evenly text-small-regular'>
					{headers.map((header) => (
						<th key={String(header)} className='w-1/12'>
							{String(header)}
						</th>
					))}
				</tr>
			</thead>
			<tbody className=''>
				{data.map((item, index) => (
					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
						{headers.map((header) => (
							<td key={String(header)} className='w-1/12'>
								{header === 'colorIdentity' && colorIconMap
									? item[header]
											.split('')
											.map((color: string, index: number) => (
												<Image
													key={`mostplayed-${color}-${index}`}
													className='mx-1'
													src={colorIconMap[color]}
													width={24}
													height={24}
													alt={`${color} Mana Icon`}
												/>
											))
									: item[header]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
