import Pagination from '@/src/components/shared/Pagination';
import Search from '@/src/components/shared/Search';
import { InvoicesTableSkeleton } from '@/src/components/ui/skeletons';
import Table from '@/src/components/ui/table';
import { colorIconMap, mostPlayedCardsHeaders } from '@/src/constants';
import { mostPlayedCardsData } from '@/src/constants/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import { Suspense } from 'react';

async function getData({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}): Promise<{ data: mostPlayedCardsData[]; totalPages: number }> {
	noStore();

	try {
		const response = await fetch(
			`${process.env.SERVER_API_ADDRESS}cards/mostPlayedCards?page=${currentPage}&query=${query}`
		);
		const { data, totalPages } = await response.json();

		return { data, totalPages };
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

const MostPlayedCards = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) => {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	const { data, totalPages } = await getData({ query, currentPage });

	return (
		<>
			{/* <h1 className=''>Most Played Cards</h1> */}

			<div className='my-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Search cards...' />
			</div>
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<Table data={data} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default MostPlayedCards;
