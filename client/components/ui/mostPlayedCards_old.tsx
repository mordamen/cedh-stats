type CardData = {
	cardName: string;
	colorIdentity: string;
	cardType: string;
	inNumberOfDecks: number;
	inPercentOfDecks: number;
};

// Define a type for mapping color characters to icon components
type ColorIconMap = { [key in string]: React.ReactElement };

// Create the colorIconMap with correct types
const colorIconMap: ColorIconMap = {
	W: <img src='/assets/white-mana.svg' width='24' alt='White Mana Icon' />,
	U: <img src='/assets/blue-mana.svg' width='24' alt='Blue Mana Icon' />,
	B: <img src='/assets/black-mana.svg' width='24' alt='Black Mana Icon' />,
	R: <img src='/assets/red-mana.svg' width='24' alt='Red Mana Icon' />,
	G: <img src='/assets/green-mana.svg' width='24' alt='Green Mana Icon' />,
	C: <img src='/assets/colorless-mana.svg' width='24' alt='Colorless Mana Icon' />,
};

async function getData(): Promise<CardData[]> {
	try {
		const response = await fetch('http://localhost:8181/api/cards/mostPlayedCards');
		const data: CardData[] = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw to handle in the component
	}
}

const MostPlayedCardsOld = async () => {
	const data = await getData();

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Most Played Cards</h1>
			<table className=' table-auto min-w-full '>
				<thead>
					<tr className=''>
						<th>#</th>
						<th>Card Name</th>
						<th>Color Identity</th>
						<th>Card Type</th>
						<th>In X Number of Decks</th>
						<th>In % Number of Decks</th>
					</tr>
				</thead>
				<tbody>
					{data.map((card, index) => (
						<tr
							key={index}
							className='grid grid-cols-3 grid-rows-2 md:table-row text-cadet dark:text-white text-lg rounded-lg shadow-modal py-2 sm:py-0 md:[&>td]:py-3 font-medium border-spacing-6'
						>
							<td>{index}</td>
							<td>{card.cardName}</td>
							<td className='flex flex-wrap px-2 gap-2 !m-0 align-middle [&>img]:w-5 md:[&>img]:w-6 col-start-1 col-span-2 row-start-2gap-1 items-center'>
								{card.colorIdentity.split('').map((color) => colorIconMap[color])}
							</td>
							<td>{card.cardType}</td>
							<td>{card.inNumberOfDecks}</td>
							<td>{`${card.inPercentOfDecks} %`}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MostPlayedCardsOld;
