'use client';

import { useState, useEffect } from 'react';

interface DeckData {
	_id: string;
	count: number;
}

const DeckByColorIdentity = () => {
	const [data, setData] = useState<DeckData[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Update the fetch URL to use the correct port (8181)
				const response = await fetch(
					'http://localhost:8181/api/decks/decksByColorIdentity'
				);
				if (response.ok) {
					const result = await response.json();
					setData(result);
				} else {
					console.error('Failed to fetch data:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Your Page</h1>
			{data ? (
				<ul>
					{data.map((item) => (
						<li key={item._id}>
							{item._id}: {item.count}
						</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default DeckByColorIdentity;
