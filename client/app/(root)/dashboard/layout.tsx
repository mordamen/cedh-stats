import { ReactNode } from 'react';

export default function RootLayout({ children, mostplayedCards }: { children: ReactNode; mostplayedCards: ReactNode }) {
	return (
		<>
			{children}
			{mostplayedCards}
		</>
	);
}
