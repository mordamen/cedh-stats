import Filters from '@/components/filter/filters';
import Search from '@/components/ui/search';

const page = async () => {
	return (
		<>
			<div className='container flex flex-col justify-between gap-2 my-4 md:mt-10'>
				<Filters />
				<Search placeholder='Search data...' />
			</div>
		</>
	);
};

export default page;
