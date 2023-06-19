import { describe, it, expect } from 'vitest';
import Poker from '../../../src/utils/poker/game';

describe('Poker game tests', () => {
  it('Should properly shuffle the deck', () => {
    const game = new Poker();
    const oldDeck = structuredClone(game.deck);
    const oldDeckLength = game.deck.length;

    game.shuffleDeck();

    expect(oldDeck).not.toEqual(game.deck);
    expect(oldDeckLength).toEqual(game.deck.length);
  });

  it('Should deal a card', () => {
    const game = new Poker();

    const oldDeck = structuredClone(game.deck);
    const oldDeckLength = game.deck.length;

    const dealtCard = game.dealACard();

    expect(game.deck).not.toContain(dealtCard);
    expect(game.deck).not.toEqual(oldDeck);
    expect(game.deck.length).not.toEqual(oldDeckLength);
    expect(game.discard).toContain(dealtCard);
    expect(game.discard.length).to.equal(1);
  });

  it('Should get the number of cards left in the deck', () => {
    const game = new Poker();
    const oldDeckLength = game.deck.length;

    const iterations = Math.floor(Math.random() * 50) + 5;

    for (let i = 0; i < iterations; i += 1) {
      game.dealACard();
    }

    expect(game.cardsLeft).toEqual(game.deck.length);
    expect(game.cardsLeft).toEqual(oldDeckLength - game.discard.length);
  });
});
