import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

export default function Layout({
	children,
	mostPlayedCards,
	averagesPerDeck,
	decksByColorIdentity,
	deckStats,
}: {
	children: ReactNode;
	mostPlayedCards: ReactNode;
	averagesPerDeck: ReactNode;
	decksByColorIdentity: ReactNode;
	deckStats: ReactNode;
}) {
	return (
		<>
			{children}
			<Tabs defaultValue='cards' className=''>
				<TabsList className='bg-sky-950	topbar'>
					<TabsTrigger value='cards'>Cards</TabsTrigger>
					<TabsTrigger value='decks'>Decks</TabsTrigger>
				</TabsList>
				<TabsContent value='cards' className='p-6 md:p-12'>
					{mostPlayedCards}
				</TabsContent>
				<TabsContent value='decks' className='p-6 md:p-12'>
					<div className='flex flex-row'>
						{averagesPerDeck}
						{decksByColorIdentity}
					</div>
					{deckStats}
				</TabsContent>
			</Tabs>
		</>
	);
}
