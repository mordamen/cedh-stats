import Pagination from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { AveragesByColorIdentityData } from '@/source/types';
import { siteConfig } from '@/source/config/site';

import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';
import Table from '@/source/components/table/Table';

async function getData({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}): Promise<{ data: AveragesByColorIdentityData[]; totalPages: number }> {
	noStore();

	try {
		const response = await fetch(
			`${process.env.SERVER_API_ADDRESS}decks/averagesByColorIdentity?page=${currentPage}&query=${query}`
		);
		const { data, totalPages } = await response.json();

		return { data, totalPages };
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

const averagesByColorIdentity = async ({
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
				<Table data={data} columns={siteConfig.AveragesByColorIdentityHeaders} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default averagesByColorIdentity;
