import Search from '@/components/shared/Search';
import Filters from '@/components/ui/filters';

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
