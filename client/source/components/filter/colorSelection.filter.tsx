// Import necessary components and hooks
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { CgAdd } from 'react-icons/cg';
import { RxReset } from 'react-icons/rx';
import { siteConfig } from '@/source/config/site';

/**
 * ColorSelection functional component for managing color selection
 */
const ColorSelection = () => {
	// Get the current pathname, search params, and router
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	// State to manage the selected colors
	const [selectedColors, setSelectedColors] = useState<string[]>([]);

	// Debounced callback to update URL params
	const setNewParams = useDebouncedCallback((colors) => {
		const params = new URLSearchParams(searchParams);

		if (colors) {
			params.set('colorID', colors.join('').toString());
		} else {
			params.delete('colorID');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	/**
	 * Handle click on color icons, toggle selection, and update state
	 * @param colorLabel - Label of the color icon clicked
	 */
	const handleClick = (colorLabel: string) => {
		const newSelectedColors = [...selectedColors];

		if (newSelectedColors.includes(colorLabel)) {
			const index = newSelectedColors.indexOf(colorLabel);
			newSelectedColors.splice(index, 1);
		} else {
			newSelectedColors.push(colorLabel);
		}

		console.log(' ~ handleClick ~ newSelectedColors:', newSelectedColors);

		setSelectedColors(newSelectedColors);
		setNewParams(newSelectedColors);
	};

	/**
	 * Reset selected colors to empty array
	 */
	const handleReset = () => {
		const resetSelectedColors: string[] = [];
		setSelectedColors(resetSelectedColors);
		setNewParams(resetSelectedColors);
	};

	return (
		<Popover placement='bottom' showArrow={true}>
			<PopoverTrigger>
				<Button className='bg-transparent border-dashed border-2 rounded-full text-xs m-1 p-2 gap-0' size='sm'>
					{selectedColors.length > 0 ? (
						<>
							{selectedColors.map((colorLabel: string) => {
								const matchingIcon = siteConfig.colorIcons.find((icon) => icon.label === colorLabel);
								return (
									<>
										<Image
											key={colorLabel}
											className='m-1 rounded-full '
											src={matchingIcon?.imgURL ?? ''}
											width={20}
											height={20}
											alt={`${colorLabel} Mana Icon`}
										/>
									</>
								);
							})}
							<Button onClick={handleReset} className='bg-transparent min-w-1 p-0'>
								<RxReset />
							</Button>
						</>
					) : (
						<>
							<CgAdd />
							<span className='ml-1'>Color Identity</span>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className='flex flex-row flex-wrap bg-blue z-50 p-1 rounded-lg border-2 max-w-40'>
				{siteConfig.colorIcons.map((color) => (
					<Button
						key={`${color.label}`}
						onClick={() => handleClick(color.label)}
						className='bg-transparent p-1 min-w-9'
					>
						<Image
							className={`${
								selectedColors.includes(color.label) ? 'border-red-600 ' : 'border-transparent'
							} border-2 rounded-full transition-all duration-200 aspect-square `}
							src={color.imgURL}
							width={36}
							height={36}
							alt={`${color.label} Mana Icon`}
						/>
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};

// Export the component for use in other parts of the application
export default ColorSelection;
