'use client';

import CardType from './filter/cardType.filter';
import ColorSelection from './filter/colorSelection.filter';

const Filters = () => {
	return (
		<div>
			<ColorSelection />
			<CardType />
		</div>
	);
};

export default Filters;
