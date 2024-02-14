import { ReactNode } from 'react';

export default function Layout({ children, mostPlayedCards }: { children: ReactNode; mostPlayedCards: ReactNode }) {
	return (
		<>
			{children}
			<div className='p-6 md:p-12'>{mostPlayedCards}</div>
		</>
	);
}
