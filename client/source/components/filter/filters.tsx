'use client';

import CardType from './cardType.filter';
import ColorSelection from './colorSelection.filter';

const Filters = () => {
	return (
		<div>
			<ColorSelection />
			<CardType />
		</div>
	);
};

export default Filters;
