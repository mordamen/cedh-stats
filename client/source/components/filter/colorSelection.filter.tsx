// Import necessary components and hooks
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { CgAdd } from 'react-icons/cg';
import { RxReset } from 'react-icons/rx';
import { siteConfig } from '@/source/config/site';

// Define the ColorSelection functional component
const ColorSelection = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const setNewParams = useDebouncedCallback((colors) => {
		const params = new URLSearchParams(searchParams);
		// params.set('page', '1');

		console.log('🚀 ~ ColorSelection ~ pathname:', pathname);
		if (colors) {
			params.set('colorID', colors.join('').toString());
		} else {
			params.delete('colorID');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	// State to manage the selected colors
	const [selectedColors, setSelectedColors] = useState<string[]>([]);

	// Function to handle clicks on color icons, toggling their selection
	const handleClick = (colorLabel: string) => {
		// Create a copy of the selectedColors array to avoid direct mutation
		const newSelectedColors = [...selectedColors];

		// Check if the color is already selected
		if (newSelectedColors.includes(colorLabel)) {
			// Deselect the color
			const index = newSelectedColors.indexOf(colorLabel);
			newSelectedColors.splice(index, 1);
		} else {
			// Select the color
			newSelectedColors.push(colorLabel);
		}

		// Log the updated selected colors for debugging
		console.log(' ~ handleClick ~ newSelectedColors:', newSelectedColors);

		// Update the state with the new selected colors
		setSelectedColors(newSelectedColors);
		setNewParams(newSelectedColors);
	};

	const handleReset = () => {
		const resetSelectedColors: string[] = [];
		// Update the state with an empty array
		setSelectedColors(resetSelectedColors);
		setNewParams(resetSelectedColors);
	};

	// Return the JSX structure of the component
	return (
		<Popover>
			<PopoverTrigger>
				<Button className='border-dashed rounded-full text-xs m-1 p-2' size='sm'>
					{/* Conditionally render content based on selected colors */}
					{selectedColors.length > 0 ? (
						<>
							{/* Render selected color icons within the button */}
							{selectedColors.map((colorLabel: string) => {
								const matchingIcon = siteConfig.colorIcons.find((icon) => icon.label === colorLabel);
								return (
									<>
										<Image
											key={colorLabel}
											className='m-1 rounded-full'
											src={matchingIcon?.imgURL ?? ''}
											width={20}
											height={20}
											alt={`${colorLabel} Mana Icon`}
										/>
									</>
								);
							})}
							{/* Button to reset selectedColors */}
							<Button onClick={handleReset}>
								<RxReset />
							</Button>
						</>
					) : (
						<>
							{/* Display if no colors are selected */}
							<CgAdd />
							<span className='ml-1'>Color Identity</span>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className='flex flex-row flex-wrap justify-around bg-blue z-50 p-1 rounded-lg border-2  '>
				{/* Map over the colorIcons array to create buttons for each color */}
				{siteConfig.colorIcons.map((color) => (
					<Button
						key={`${color.label}`}
						onClick={() => handleClick(color.label)}
						// href={`${setNewParams(selectedColors)}`}
						className='m-1'
					>
						<Image
							className={`${
								selectedColors.includes(color.label) ? 'border-red-600 ' : 'border-transparent'
							} border-2 rounded-full transition-all duration-200 aspect-square`}
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
