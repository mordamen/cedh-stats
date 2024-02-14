import { siteConfig } from '@/source/config/site';
import { Skeleton } from '@/components/ui/skeleton';
import Table from '@/source/components/table/Table';
import Pagination from '@/source/components/ui/pagination';
import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';
import { mostPlayedCardsData } from '@/source/types';

/**
 * Fetches most played cards data from the server
 * @param {string} query - The search query
 * @param {number} currentPage - The current page number
 * @param {string} colorIdentity - The color identity
 * @returns {Promise<{ data: mostPlayedCardsData[]; totalPages: number }>} The most played cards data and the total number of pages
 */
const getData = async ({
	query,
	currentPage,
	cardType,
	colorIdentity,
}: {
	query: string;
	currentPage: number;
	cardType: string;
	colorIdentity: string;
}): Promise<{ data: mostPlayedCardsData[]; totalPages: number }> => {
	// Disable caching
	noStore();

	try {
		// Send request to the server
		const response = await fetch(
			`${process.env.SERVER_API_ADDRESS}cards/mostPlayedCards?page=${currentPage}&query=${query}&cardType=${cardType}&colorID=${colorIdentity}`
		);

		// Parse the response
		const { data, totalPages } = await response.json();

		return { data, totalPages };
	} catch (error) {
		// Log and re-throw the error to handle in the component
		console.error(error);
		throw error;
	}
};

/**
 * Asynchronously fetches the most played cards based on the given search parameters.
 * @param searchParams - The search parameters including query, page, and colorID.
 */
const MostPlayedCards = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string; // The search query
		page?: string; // The page number
		cardType?: string; // The card type
		colorID?: string; // The color ID
	};
}) => {
	const query = searchParams?.query || ''; // Set query to empty string if not provided
	const currentPage = Number(searchParams?.page) || 1; // Set currentPage to 1 if not provided
	const cardType = searchParams?.cardType || ''; // Set cardType to empty string if not provided
	const colorIdentity = searchParams?.colorID || ''; // Set colorIdentity to empty string if not provided

	// Fetch data and total pages
	const { data, totalPages } = await getData({ query, currentPage, cardType, colorIdentity });

	// Render the UI
	return (
		<>
			<Suspense key={query + currentPage} fallback={<Skeleton />}>
				{/* <!-- Table component displaying most played cards --> */}
				<Table data={data} columns={siteConfig.mostPlayedCardsHeaders} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				{/* <!-- Pagination component --> */}
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default MostPlayedCards;
