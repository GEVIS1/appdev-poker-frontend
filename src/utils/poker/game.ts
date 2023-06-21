import { TupleOf } from '../utilitytypes';
import combinations from './combinations';

export enum Suit {
  Spade = 'SPADE',
  Club = 'CLUB',
  Heart = 'HEART',
  Diamond = 'DIAMOND',
}
export enum Rank {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,
}
export interface Card {
  suit: Suit;
  rank: Rank;
}
export interface Hand {
  cards: [Card, Card, Card, Card, Card];
}

class Poker {
  deck: Array<Card> = [];

  discard: Array<Card> = [];

  HAND_SIZE = 5 as const;

  constructor() {
    this.constructDeck();
  }

  /**
   * Clears the deck and discard arrays and loads the deck with one card of each rank for each suit.
   */
  public constructDeck() {
    /*
     * Unfortunately there is no good/safe way to get the length of enums
     * in TypeScript (that I'm aware of currently),
     * so we construct two arrays. Since we can safely assume that the standard
     * playing card deck ranks and suits will not change any time soon,
     * we hard code two arrays for looping through to construct the deck.
     */
    const ranks = [
      Rank.TWO,
      Rank.THREE,
      Rank.FOUR,
      Rank.FIVE,
      Rank.SIX,
      Rank.SEVEN,
      Rank.EIGHT,
      Rank.NINE,
      Rank.TEN,
      Rank.JACK,
      Rank.QUEEN,
      Rank.KING,
      Rank.ACE,
    ];

    const suits = [Suit.Club, Suit.Spade, Suit.Heart, Suit.Diamond];

    this.deck = [];
    this.discard = [];

    for (let suit = 0; suit < suits.length; suit += 1) {
      for (let rank = 0; rank < ranks.length; rank += 1) {
        this.deck.push({
          suit: suits[suit],
          rank: ranks[rank],
        });
      }
    }
  }

  /**
   * Randomly shuffles the deck.
   * Swaps cards at random for a defined number of iterations.
   */
  public shuffleDeck() {
    const iterations = 1e6;

    for (let i = 0; i < iterations; i += 1) {
      const indexA = this.randomCardIndex();
      const indexB = this.randomCardIndex();
      this.swap(indexA, indexB);
    }
  }

  /**
   * Randomly picks the index of a card in the deck and returns it.
   * @returns The index of a card in the deck.
   */
  private randomCardIndex = () => Math.floor(Math.random() * this.deck.length);

  /**
   * Swaps card A and B in the deck.
   * @param cardA Index of card A.
   * @param cardB Index of card B.
   */
  private swap(cardA: number, cardB: number) {
    const tempCard = this.deck[cardA];
    this.deck[cardA] = this.deck[cardB];
    this.deck[cardB] = tempCard;
  }

  /**
   * Get the number of cards left in the deck.
   */
  public get cardsLeft(): number {
    return this.deck.length;
  }

  /**
   * Deal the top card of the deck by returning it and putting a copy in the discard pile.
   * Will throw an error if the deck is empty.
   * @returns The picked card.
   */
  public dealACard() {
    const pickedCard = this.deck.pop();

    if (pickedCard === undefined) {
      throw new Error('Deck is empty.');
    }

    this.discard.push(pickedCard);

    return pickedCard;
  }

  /**
   * Why dealACard when you can dealAHand?
   * @returns A hand of cards of length HAND_SIZE.
   */
  public dealAHand() {
    if (this.deck.length < this.HAND_SIZE) {
      throw new Error('Not enough cards left in the deck to deal a hand.');
    }

    const cards = [];

    for (let i = 0; i < this.HAND_SIZE; i += 1) {
      cards.push(this.dealACard());
    }

    const hand: Hand = {
      /*
       * TODO: Figure out why the utility type only accepts literal 5
       * and not this.HAND_SIZE or a variable with the value 5.
       */
      cards: cards as TupleOf<Card, 5>,
    };

    return hand;
  }

  /**
   * Run through all the possible combinations and evaluate the hand with them.
   * @param hand The hand to evaluate.
   * @returns The name of the combination and the score of the hand.
   */
  public static calculateScore(hand: Hand): [string, number] {
    // Sort hand descending by rank and get the highest card
    const highCard = hand.cards
      .sort((a, b) => b.rank - a.rank)
      .map((card) => card.rank)[0];

    for (let i = 0; i < combinations.length; i += 1) {
      const combination = combinations[i];
      /*
       * If the combination evaluates to true we know that the hand is
       * that combination and we can return it, ending the loop.
       */
      if (combination.evaluate(hand) === true) {
        return [combination.name, combination.score + highCard];
      }
    }
    // If we get to the end of the loop and no combination is found, the hand is a high card
    return ['High Card', highCard];
  }
}

export default Poker;
