import { ReactNode } from 'react';

export default function DecksLayout({
	children,
	averagesPerDeck,
	averagesByColorIdentity,
	decksByColorIdentity,
	deckStats,
}: {
	children: ReactNode;
	averagesPerDeck: ReactNode;
	averagesByColorIdentity: ReactNode;
	decksByColorIdentity: ReactNode;
	deckStats: ReactNode;
}) {
	return (
		<>
			{children}
			<div className='flex flex-row'>
				{averagesPerDeck}
				{decksByColorIdentity}
			</div>
			<div className='p-6 md:p-12'>
				{averagesByColorIdentity}
				{deckStats}
			</div>
		</>
	);
}
