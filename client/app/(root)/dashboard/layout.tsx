import { ReactNode } from 'react';

export default function RootLayout({
	children,
	mostPlayedCards,
	deckStats,
}: {
	children: ReactNode;
	mostPlayedCards: ReactNode;
	deckStats: ReactNode;
}) {
	return (
		<>
			{children}
			{mostPlayedCards}
			{deckStats}
		</>
	);
}
