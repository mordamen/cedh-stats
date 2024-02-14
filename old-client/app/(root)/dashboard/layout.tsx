import { ReactNode } from 'react';

import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react';
import { tabs } from '@/constants/site';

export default function Layout({
	children,
	mostPlayedCards,
	averagesPerDeck,
	averagesByColorIdentity,
	decksByColorIdentity,
	deckStats,
}: {
	children: ReactNode;
	mostPlayedCards: ReactNode;
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

			{/* <div className='flex w-full flex-col'>
				<Tabs aria-label='Dynamic tabs' items={tabs}>
					{(item) => (
						<Tab key={item.id} title={item.label}>
							<Card>
								<CardBody>{item.content}</CardBody>
							</Card>
						</Tab>
					)}
				</Tabs>
			</div> */}

			{/* <Tabs defaultValue='cards'>
				<TabsList className='topbar text-white '>
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
					{averagesByColorIdentity}
					{deckStats}
				</TabsContent>
			</Tabs> */}
		</>
	);
}
