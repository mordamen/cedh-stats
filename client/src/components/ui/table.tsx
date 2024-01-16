// import { FC } from 'react';
import Image from 'next/image';
import { colorIconMap } from '@/src/constants';
import { mostPlayedCardsData } from '@/src/constants/definitions';

// // Declare generic types at the top level
// type T = any; // Substitute with the actual type of your data
// type U = keyof T;
// interface Props<T, U extends keyof T> {
// 	data: T[];
// 	headers: U[];
// }

// const DataTable: FC<Props<T, U>> = ({ data, headers }) => {
// 	return (
// 		<table className='flex flex-col text-white'>
// 			<thead className=''>
// 				<tr className='flex justify-evenly text-small-regular'>
// 					{headers.map((header) => (
// 						<th key={String(header)} className='w-1/12'>
// 							{String(header)}
// 						</th>
// 					))}
// 				</tr>
// 			</thead>
// 			<tbody className=''>
// 				{data.map((item, index) => (
// 					<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
// 						{headers.map((header) => (
// 							<td key={String(header)} className='w-1/12'>
// 								{header === 'colorIdentity' && colorIconMap
// 									? item[header]
// 											.split('')
// 											.map((color: string, index: number) => (
// 												<Image
// 													key={`mostplayed-${color}-${index}`}
// 													className='mx-1'
// 													src={colorIconMap[color]}
// 													width={24}
// 													height={24}
// 													alt={`${color} Mana Icon`}
// 												/>
// 											))
// 									: item[header]}
// 							</td>
// 						))}
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// };

// export default DataTable;

const Table = ({ data }: { data: mostPlayedCardsData[] }) => {
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

export default Table;
