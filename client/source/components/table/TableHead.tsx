'use client';

import { useState } from 'react';

interface TableColumn {
	label: string;
	accessor: string;
	sortable: boolean;
}

interface TableHeadProps {
	columns: TableColumn[];
	handleSorting: (accessor: string, order: string) => void;
}

/**
 * TableHead component for rendering the table header
 * @param columns - Array of column objects containing label, accessor, and sortable
 * @param handleSorting - Function to handle sorting when column header is clicked
 */
const TableHead: React.FC<TableHeadProps> = ({ columns, handleSorting }) => {
	// State to track the sorting configuration
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({ key: '', direction: '' });

	/**
	 * Function to handle sorting change when column header is clicked
	 * @param accessor - The accessor of the column being sorted
	 */
	const handleSortingChange = (accessor: string) => {
		// Determine the new sorting direction based on the current sorting configuration
		const newDirection = accessor === sortConfig.key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
		// Update the sortConfig state with the new sorting configuration
		setSortConfig({ key: accessor, direction: newDirection });
		// Call the handleSorting function if it exists, passing the accessor and newDirection
		handleSorting && handleSorting(accessor, newDirection);
	};

	// Render the table header
	return (
		<thead className=' '>
			<tr>
				{columns.map(({ label, accessor, sortable }) => {
					// Determine the CSS class for the sorting indicator
					const cl = sortable
						? sortConfig.key === accessor && sortConfig.direction === 'asc'
							? 'up'
							: sortConfig.key === accessor && sortConfig.direction === 'desc'
							? 'down'
							: 'default'
						: '';
					// Render the table header cell
					return (
						<th
							key={accessor}
							className={`${cl} xs:text-xs md:text-base`}
							// Attach click event handler for sorting if the column is sortable
							onClick={sortable ? () => handleSortingChange(accessor) : undefined}
						>
							{label}
							{/* {cl === 'up' && <TbArrowUp />}
							{cl === 'down' && <TbArrowDown />}
							{cl === 'default' && <TbArrowsUpDown />} */}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
export default TableHead;
