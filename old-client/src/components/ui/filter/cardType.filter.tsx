import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Button } from '../button';
import { CgAdd } from 'react-icons/cg';

const CardType = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<Button className='rounded-full text-xs border-dashed m-1 p-2' variant='outline' size='sm'>
					<CgAdd />
					<span className='ml-1'>Card Type</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent>Place content for the popover here.</PopoverContent>
		</Popover>
	);
};

export default CardType;
