import { describe, it, expect } from 'vitest';
import Poker, { Hand, Rank, Suit } from '../../../src/utils/poker/game';

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

  it('Should throw an error when dealing a card from an empty deck', () => {
    const game = new Poker();

    const iterations = game.deck.length;

    for (let i = 0; i < iterations; i += 1) {
      game.dealACard();
    }

    expect(() => game.dealACard()).toThrow('Deck is empty.');
  });

  it('Should correctly calculate the scores for all the possible combinations', () => {
    const game = new Poker();

    const iterations = 2e5;

    const scores = {};

    for (let i = 0; i < iterations; i += 1) {
      game.shuffleDeck();

      let hand: Hand;

      try {
        hand = game.dealAHand();
      } catch (e) {
        game.constructDeck();
        game.shuffleDeck();
        hand = game.dealAHand();
      }

      const [combination] = Poker.calculateScore(hand);

      scores[combination] = (scores[combination] || 0) + 1;
    }

    /*
     * We only do 200000 iterations here, so we can't expect a royal flush every time.
     * So we just run a royal flush through at the end to make sure it's accounted for.
     */

    const royalFlushHand: Hand = {
      cards: [
        {
          suit: Suit.Spade,
          rank: Rank.ACE,
        },
        {
          suit: Suit.Spade,
          rank: Rank.KING,
        },
        {
          suit: Suit.Spade,
          rank: Rank.QUEEN,
        },
        {
          suit: Suit.Spade,
          rank: Rank.JACK,
        },
        {
          suit: Suit.Spade,
          rank: Rank.TEN,
        },
      ],
    };

    const [combination] = Poker.calculateScore(royalFlushHand);

    scores[combination] = (scores[combination] || 0) + 1;

    expect(scores['Royal Flush']).toBeGreaterThan(0);
    expect(scores['Straight Flush']).toBeGreaterThan(0);
    expect(scores['Four of a Kind']).toBeGreaterThan(0);
    expect(scores['Full House']).toBeGreaterThan(0);
    expect(scores['Flush']).toBeGreaterThan(0);
    expect(scores['Straight']).toBeGreaterThan(0);
    expect(scores['Three of a Kind']).toBeGreaterThan(0);
    expect(scores['Two Pairs']).toBeGreaterThan(0);
    expect(scores['One Pair']).toBeGreaterThan(0);
    expect(scores['High Card']).toBeGreaterThan(0);
  });
});
