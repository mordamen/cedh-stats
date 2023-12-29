'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8181/api';

interface Card {
  cardName: string;
  colorIdentity: string;
  cardType: string;
  inNumberOfDecks: number;
  inPercentOfDecks: number;
}

function Dashboard() {
  const [mostPlayedCards, setMostPlayedCards] = useState<Card[]>([]);

  useEffect(() => {
    async function fetchMostPlayedCards() {
      try {
        const response = await axios.get('/cards/mostPlayedCards');
        const data: Card[] = response.data;
        setMostPlayedCards(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMostPlayedCards();
  }, []);

  return (
    <div>
      <h2>Most Played Cards</h2>
      <table>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Color Identity</th>
            <th>Card Type</th>
            <th>In X Number of Decks</th>
            <th>In % Number of Decks</th>
          </tr>
        </thead>
        <tbody>
          {mostPlayedCards.map((card, index) => (
            <tr key={index}>
              <td>{card.cardName}</td>
              <td>{card.colorIdentity}</td>
              <td>{card.cardType}</td>
              <td>{card.inNumberOfDecks}</td>
              <td>{`${card.inPercentOfDecks} %`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
