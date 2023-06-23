import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Card, Rank, Suit } from '../../src/utils/poker/game';
import CardComponent from '../../src/components/CardComponent';

// Hardcoded values ahead
const cardWithResult: Array<[Card, String]> = [
      [{ suit: Suit.Spade, rank: Rank.ACE }, '🂡'],
      [{ suit: Suit.Spade, rank: Rank.TWO }, '🂢'],
      [{ suit: Suit.Spade, rank: Rank.THREE }, '🂣'],
      [{ suit: Suit.Spade, rank: Rank.FOUR }, '🂤'],
      [{ suit: Suit.Spade, rank: Rank.FIVE }, '🂥'],
      [{ suit: Suit.Spade, rank: Rank.SIX }, '🂦'],
      [{ suit: Suit.Spade, rank: Rank.SEVEN }, '🂧'],
      [{ suit: Suit.Spade, rank: Rank.EIGHT }, '🂨'],
      [{ suit: Suit.Spade, rank: Rank.NINE }, '🂩'],
      [{ suit: Suit.Spade, rank: Rank.TEN }, '🂪'],
      [{ suit: Suit.Spade, rank: Rank.JACK }, '🂫'],
      [{ suit: Suit.Spade, rank: Rank.QUEEN }, '🂭'],
      [{ suit: Suit.Spade, rank: Rank.KING }, '🂮'],

      [{ suit: Suit.Heart, rank: Rank.ACE }, '🂱'],
      [{ suit: Suit.Heart, rank: Rank.TWO }, '🂲'],
      [{ suit: Suit.Heart, rank: Rank.THREE }, '🂳'],
      [{ suit: Suit.Heart, rank: Rank.FOUR }, '🂴'],
      [{ suit: Suit.Heart, rank: Rank.FIVE }, '🂵'],
      [{ suit: Suit.Heart, rank: Rank.SIX }, '🂶'],
      [{ suit: Suit.Heart, rank: Rank.SEVEN }, '🂷'],
      [{ suit: Suit.Heart, rank: Rank.EIGHT }, '🂸'],
      [{ suit: Suit.Heart, rank: Rank.NINE }, '🂹'],
      [{ suit: Suit.Heart, rank: Rank.TEN }, '🂺'],
      [{ suit: Suit.Heart, rank: Rank.JACK }, '🂻'],
      [{ suit: Suit.Heart, rank: Rank.QUEEN }, '🂽'],
      [{ suit: Suit.Heart, rank: Rank.KING }, '🂾'],

      [{ suit: Suit.Diamond, rank: Rank.ACE }, '🃁'],
      [{ suit: Suit.Diamond, rank: Rank.TWO }, '🃂'],
      [{ suit: Suit.Diamond, rank: Rank.THREE }, '🃃'],
      [{ suit: Suit.Diamond, rank: Rank.FOUR }, '🃄'],
      [{ suit: Suit.Diamond, rank: Rank.FIVE }, '🃅'],
      [{ suit: Suit.Diamond, rank: Rank.SIX }, '🃆'],
      [{ suit: Suit.Diamond, rank: Rank.SEVEN }, '🃇'],
      [{ suit: Suit.Diamond, rank: Rank.EIGHT }, '🃈'],
      [{ suit: Suit.Diamond, rank: Rank.NINE }, '🃉'],
      [{ suit: Suit.Diamond, rank: Rank.TEN }, '🃊'],
      [{ suit: Suit.Diamond, rank: Rank.JACK }, '🃋'],
      [{ suit: Suit.Diamond, rank: Rank.QUEEN }, '🃍'],
      [{ suit: Suit.Diamond, rank: Rank.KING }, '🃎'],
      
      [{ suit: Suit.Club, rank: Rank.ACE }, '🃑'],
      [{ suit: Suit.Club, rank: Rank.TWO }, '🃒'],
      [{ suit: Suit.Club, rank: Rank.THREE }, '🃓'],
      [{ suit: Suit.Club, rank: Rank.FOUR }, '🃔'],
      [{ suit: Suit.Club, rank: Rank.FIVE }, '🃕'],
      [{ suit: Suit.Club, rank: Rank.SIX }, '🃖'],
      [{ suit: Suit.Club, rank: Rank.SEVEN }, '🃗'],
      [{ suit: Suit.Club, rank: Rank.EIGHT }, '🃘'],
      [{ suit: Suit.Club, rank: Rank.NINE }, '🃙'],
      [{ suit: Suit.Club, rank: Rank.TEN }, '🃚'],
      [{ suit: Suit.Club, rank: Rank.JACK }, '🃛'],
      [{ suit: Suit.Club, rank: Rank.QUEEN }, '🃝'],
      [{ suit: Suit.Club, rank: Rank.KING }, '🃞'],
]
const cardBack = '🂠';

describe('CardComponent tests', () => {
  it('Should render the character for the correct card', () => {
     for (const [card, result] of cardWithResult) {
       render(<CardComponent card={card} />);
       const component = screen.getByText(result as string);
       expect(component.innerHTML).toBe(result);
       cleanup();
      }
  });

  it('Should render the card face down', () => {
    for (const [card, result] of cardWithResult) {
      render(<CardComponent card={card} faceDown />);
      const component = screen.getByText(cardBack);
      expect(component.innerHTML).toBe(cardBack);
      cleanup();
     }
  });

  it('Should render spades and clubs black', () => {
    const blackCards = cardWithResult.filter(([card, _]) => card.suit === Suit.Spade || card.suit === Suit.Club);

    for (const [card, result] of blackCards) {
      render(<CardComponent card={card} />);
      const component = screen.getByText(result as string);
      expect(component.className.trim()).toBe('text-black');
      cleanup();
     }
  });
  it('Should render hearts and diamond red', () => {
    const blackCards = cardWithResult.filter(([card, _]) => card.suit === Suit.Heart || card.suit === Suit.Diamond);
    
    for (const [card, result] of blackCards) {
      render(<CardComponent card={card} />);
      const component = screen.getByText(result as string);
      expect(component.className.trim()).toBe('text-red-500');
      cleanup();
     }
  });
});
