'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '../icons';
import { Input } from '@nextui-org/react';

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);
		// params.set('page', '1');

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<>
			{/* <div className='relative flex flex-1 flex-shrink-0'>
				<label htmlFor='search' className='sr-only'>
					Search
				</label>
				<input
					id='search'
					className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
					placeholder={placeholder}
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
					defaultValue={searchParams.get('query')?.toString()}
				/>
				<SearchIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
			</div> */}

			<Input
				aria-label='Search'
				classNames={{
					inputWrapper: 'bg-default-100',
					input: 'text-sm',
				}}
				startContent={<SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />}
				// endContent={
				// 	<Kbd className='hidden lg:inline-block' keys={['command']}>
				// 		K
				// 	</Kbd>
				// }
				labelPlacement='outside'
				placeholder={placeholder}
				type='search'
				onChange={(event) => {
					handleSearch(event.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
		</>
	);
}
