import { DataTable } from '@/components/ui/data-table';
import { MostPlayedCards, CardData } from './mostPlayedCards.data';

async function getData(): Promise<CardData[]> {
	try {
		const response = await fetch(`${process.env.SERVER_API_ADDRESS}cards/mostPlayedCards`, {
			headers: {
				'Cache-Control': 'no-cache',
			},
		});

		const data: CardData[] = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

export default async function mostPlayedCards() {
	const data = await getData();
	return (
		<div className='container'>
			<DataTable columns={MostPlayedCards} data={data} />
		</div>
	);
}
