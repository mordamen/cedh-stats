'use client';

import { useEffect, useState } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';

const Table = ({ data, columns, currentPage }: { data: any; columns: any; currentPage: number }) => {
	const [tableData, setTableData] = useState(data);

	useEffect(() => {
		setTableData(data);
	}, [data, currentPage]);

	/**
	 * Sorts the table data based on the specified field and order.
	 * @param {string} sortField - The field to sort by.
	 * @param {string} sortOrder - The order of sorting ('asc' for ascending, 'desc' for descending).
	 */
	const handleSorting = (sortField: string, sortOrder: string) => {
		if (sortField) {
			try {
				const sorted = [...tableData].sort((a, b) => {
					const fieldA = a[sortField];
					const fieldB = b[sortField];

					if (fieldA === null) return sortOrder === 'asc' ? 1 : -1;
					if (fieldB === null) return sortOrder === 'asc' ? -1 : 1;

					switch (typeof fieldA) {
						case 'number':
							return (fieldA - fieldB) * (sortOrder === 'asc' ? 1 : -1);
						case 'string':
							return fieldA.localeCompare(fieldB, 'en', { numeric: true }) * (sortOrder === 'asc' ? 1 : -1);
						default:
							// Handle other types of fields here (e.g., date, boolean, etc.)
							return 0;
					}
				});

				setTableData(sorted);
			} catch (error) {
				console.error('Error sorting table data:', error);
			}
		}
	};

	return (
		<>
			<table className='table w-full'>
				<TableHead {...{ columns, handleSorting }} />
				<TableBody {...{ columns, tableData, currentPage }} />
			</table>
		</>
	);
};

export default Table;
