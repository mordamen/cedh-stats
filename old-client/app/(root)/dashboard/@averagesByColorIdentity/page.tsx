import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/Search';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import Table from '@/components/ui/table/Table';
import { AveragesByColorIdentityHeaders } from '@/constants/site';
import { AveragesByColorIdentityData } from '@/types/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

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
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<Table data={data} columns={AveragesByColorIdentityHeaders} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default averagesByColorIdentity;
