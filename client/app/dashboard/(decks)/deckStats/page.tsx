import { siteConfig } from '@/source/config/site';
import Pagination from '@/components/ui/pagination';
import { DeckStatsData } from '@/source/types';
import { getData } from '@/library/actions/generic.actions';
import { TableOG, TableComponent, TableComponent2 } from '@/components/table/Table';

const DeckStats = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: number;
		colorID?: string;
		cardType?: string;
	};
}) => {
	console.log('🚀 ~ searchParams:', searchParams);

	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const colorIdentity = searchParams?.colorID || '';
	const cardType = searchParams?.cardType || '';

	const { data, totalPages } = await getData({ query, currentPage, colorIdentity, cardType });
	console.log('🚀 ~ data:', data);

	return (
		<>
			{/* <TableOG data={data} currentPage={totalPages} columns={siteConfig.DeckStatsHeaders} /> */}
			<TableComponent2 rows={data} columns={siteConfig.DeckStatsHeaders} />
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
};

export default DeckStats;
