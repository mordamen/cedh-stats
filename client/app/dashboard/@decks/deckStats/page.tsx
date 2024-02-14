import { Skeleton } from '@/components/ui/skeleton';
import Table from '@/source/components/table/Table';
// import { Table_DeckStats } from '@/components/ui/table_old';
import { siteConfig } from '@/source/config/site';
import Pagination from '@/source/components/ui/pagination';
import { DeckStatsData } from '@/source/types';

import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

async function getData({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}): Promise<{ data: DeckStatsData[]; totalPages: number }> {
	noStore();

	try {
		const response = await fetch(`${process.env.SERVER_API_ADDRESS}decks/deckStats?page=${currentPage}&query=${query}`);
		const { data, totalPages } = await response.json();

		return { data, totalPages };
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

const DeckStats = async ({
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

			<Suspense key={query + currentPage} fallback={<Skeleton />}>
				<Table data={data} columns={siteConfig.DeckStatsHeaders} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default DeckStats;
