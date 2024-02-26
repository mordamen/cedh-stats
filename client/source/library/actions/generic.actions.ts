'use server';

import { revalidateTag } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';

export async function action() {
	revalidateTag('data');
}

/**
 * Fetches data from the server based on the given parameters.
 * @param query - The search query.
 * @param currentPage - The current page number.
 * @param colorIdentity - The color identity of the card.
 * @param cardType - The type of the card.
 * @returns A promise that resolves to an object containing data and totalPages.
 */
export async function getData({
	query,
	currentPage,
	colorIdentity,
	cardType,
	page,
}: {
	query?: string;
	currentPage?: number;
	colorIdentity?: string;
	cardType?: string;
	page?: string;
}): Promise<{ data: any[]; totalPages: number }> {
	noStore();

	try {
		const response = await fetch(
			`${process.env.SERVER_API_ADDRESS}decks/deckStats?colorID=${colorIdentity}&page=${currentPage}&query=${query}&cardType=${cardType}`,
			{ next: { tags: ['data'] } }
		);
		const { data, totalPages } = await response.json();

		return { data, totalPages };
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}
