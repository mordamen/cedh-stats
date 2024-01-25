import { type ClassValue, clsx } from 'clsx';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { colorIconMap } from '../constants';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const renderColorIdentity = (colorIdentity: string) => {
	return colorIdentity
		.split('')
		.map((color, index) => (
			<Image
				key={`<span class="math-inline">\{color\}\-</span>{index}`}
				className='mx-1'
				src={colorIconMap[color]}
				width={24}
				height={24}
				alt={`${color} Mana Icon`}
			/>
		));
};
