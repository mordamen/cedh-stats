import { Link } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<nav>
				<Link href='/dashboard/cards'>Cards</Link>
				<Link href='/dashboard/decks'>Decks</Link>
			</nav>
			<div>{children}</div>
		</>
	);
}
