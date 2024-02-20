import Filters from '@/components/filter/filters';
import { TabGroup } from '@/components/tabs/tab-group';
import Search from '@/components/ui/search';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<div className='flex flex-col '>
				<div className='container flex flex-col justify-start gap-2 my-4 md:mt-10'>
					<Filters />
					<Search placeholder='Search data...' />
				</div>

				<div className='space-y-9'>
					<div className='flex justify-between'>
						<TabGroup
							path='/dashboard'
							items={[
								{ text: 'Deck Stats', slug: 'deckStats?colorID=&page=1&query=&cardType=' },
								{
									text: 'Averages By Color Identity',
									slug: 'averagesByColorIdentity?colorID=&page=1&query=&cardType=',
								},
								{ text: 'Most Played Cards', slug: 'mostPlayedCards?colorID=&page=1&query=&cardType=' },
							]}
						/>
					</div>
				</div>

				<div className='justify-end'>{children}</div>
			</div>
		</>
	);
}
