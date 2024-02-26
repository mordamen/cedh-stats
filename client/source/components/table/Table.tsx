'use client';

import { useEffect, useMemo, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Pagination,
	Spinner,
	getKeyValue,
} from '@nextui-org/react';

import TableBodyComponent from './TableBody';
import TableHead from './TableHead';

export const TableOG = ({ data, columns, currentPage }: { data: any; columns: any; currentPage: number }) => {
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
				<TableBodyComponent {...{ columns, tableData, currentPage }} />
			</table>
		</>
	);
};

const rows = [
	{
		key: '1',
		name: 'Tony Reichert',
		role: 'CEO',
		status: 'Active',
	},
	{
		key: '2',
		name: 'Zoey Lang',
		role: 'Technical Lead',
		status: 'Paused',
	},
	{
		key: '3',
		name: 'Jane Fisher',
		role: 'Senior Developer',
		status: 'Active',
	},
	{
		key: '4',
		name: 'William Howard',
		role: 'Community Manager',
		status: 'Vacation',
	},
];

const columns = [
	{
		key: 'name',
		label: 'NAME',
	},
	{
		key: 'role',
		label: 'ROLE',
	},
	{
		key: 'status',
		label: 'STATUS',
	},
];

export const TableComponent2 = ({ columns, rows }: { columns: any; rows: any }) => {
	return (
		<Table aria-label='Example table with dynamic content'>
			<TableHeader columns={columns}>
				{(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
				{(item: any) => (
					<TableRow key={item.key}>
						{(columnKey: any) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export const TableComponent = ({ columns, data }: { columns: any; data: any }) => {
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;

	const pages = Math.ceil(data.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return data.slice(start, end);
	}, [page, data]);

	return (
		<Table
			aria-label='Example table with client side pagination'
			bottomContent={
				<div className='flex w-full justify-center'>
					<Pagination
						isCompact
						showControls
						showShadow
						color='secondary'
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
					/>
				</div>
			}
			classNames={{
				wrapper: 'min-h-[222px]',
			}}
		>
			<TableHeader columns={columns}>
				{(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={data}>
				{(item: any) => (
					<TableRow key={item.name}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
