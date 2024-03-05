import React, { useState, useEffect } from "react";
import axios from "axios";

function Cards() {
  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
  const [noCards, setNoCards] = useState(false);

  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const deckIdResult = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/");
      setDeckId(deckIdResult.data.deck_id);
    }
    fetchDeckId();
  }, []);

  async function drawCard() {
    const cardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const remaining = cardResult.data.remaining;
    if (remaining === 0) {
      setNoCards(true);
    } else {
      setNoCards(false);
      const newCard = cardResult.data.cards[0];
      setCard(`${newCard.value} of ${newCard.suit}`);
    }
  };

  async function shuffle() {
    await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`
    )
  }

  return (
    <div>
      <button onClick={drawCard}>Draw a card</button>
      <button onClick={shuffle}>Shuffle deck</button>
      <div>
        <p>{card}</p>
      </div>
      {noCards && <p>No cards left in deck</p>}
    </div>
  );
};

export default Cards;
