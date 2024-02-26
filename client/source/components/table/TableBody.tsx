import Image from 'next/image';
// import { colorIcons } from '@/constants/site';
import { siteConfig } from '@/source/config/site';

/**
 * Renders the table body based on the provided data and columns
 * @param tableData - The data to be displayed in the table
 * @param columns - The columns configuration for the table
 * @param currentPage - The current page number
 * @returns The table body component
 */
const TableBodyComponent = ({
	tableData,
	columns,
	currentPage,
}: {
	tableData: any[];
	columns: { accessor: string }[];
	currentPage: number;
}) => {
	// Check if tableData or columns is empty, if so, return null
	if (!tableData || !columns || !tableData.length || !columns.length) {
		// console.log('Table data or columns are empty, returning null');
		return null;
	}

	return (
		<tbody>
			{tableData.map((data: any, index: number) => {
				// Calculate the row number based on the currentPage and index
				const rowNumber = (currentPage - 1) * 10 + index + 1;
				// console.log('Row number:', rowNumber);
				return (
					<tr key={index} className='shadow-modal rounded-lg '>
						{columns.map(({ accessor }: { accessor: string }, colIndex: number) => {
							switch (accessor) {
								case 'rowNumber':
									console.log('Displaying row number:', rowNumber);
									return <td key={accessor || colIndex}>{rowNumber}</td>;
								case 'colorIdentity':
									// console.log('Generating color icons for colorIdentity:', data[accessor]);
									const colorIcon = data[accessor]
										.split('')
										.map((color: string, colorIndex: number) => (
											<Image
												key={`colorIcon-${colorIndex}`}
												className='mx-1'
												src={siteConfig.colorIcons.find((icon) => icon.label === color)?.imgURL || ''}
												width={24}
												height={24}
												alt={`${color} Mana Icon`}
											/>
										));
									return (
										<td key={accessor || colIndex} className='flex flex-wrap items-center'>
											{colorIcon}
										</td>
									);
								case 'cardPercent':
								case 'inXDecksofColor':
									return (
										<td key={accessor || colIndex}>
											<span>{data[accessor]} %</span>
										</td>
									);
								default:
									if (!data || !data[accessor]) {
										// console.log('Data or data[accessor] is empty, displaying "——"');
										return <td key={accessor || colIndex}>——</td>;
									} else {
										// console.log(`Displaying data value for accessor ${accessor}:`, data[accessor]);
										return <td key={accessor || colIndex}>{data[accessor]}</td>;
									}
							}
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBodyComponent;
