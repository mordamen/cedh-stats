import { colorIconMap, mostPlayedCards } from '@/src/constants/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';

async function getData(): Promise<mostPlayedCards[]> {
	noStore();

	try {
		const response = await fetch(`${process.env.SERVER_API_ADDRESS}cards/mostPlayedCards`);

		const data: mostPlayedCards[] = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

const MostPlayedCards = async () => {
	const data = await getData();

	return (
		<>
			{/* <h1 className=''>Most Played Cards</h1> */}
			<table className='flex flex-col '>
				<thead className=''>
					<tr className='flex justify-evenly text-small-regular'>
						<th className='w-1/12 '>#</th>
						<th className='w-4/12 text-start pl-4'>Card Name</th>
						<th className='w-1/12'>Color Identity</th>
						<th className='w-4/12 text-start pl-4'>Card Type</th>
						<th className='w-1/12'>In X Decks</th>
						<th className='w-1/12'>% of Decks</th>
					</tr>
				</thead>
				<tbody className=''>
					{data.map((card, index) => (
						<tr key={index} className='flex justify-evenly shadow-modal rounded-lg my-2 py-2'>
							<td className='w-1/12 text-center'>{index + 1}</td>
							<td className='pl-4 w-4/12 -auto'>{card.cardName}</td>
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
							<td className='pl-4 w-4/12'>{card.cardType}</td>
							<td className='w-1/12 text-center'>{card.cardAmount}</td>
							<td className='w-1/12 text-center'>{`${card.cardPercent} %`}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default MostPlayedCards;
