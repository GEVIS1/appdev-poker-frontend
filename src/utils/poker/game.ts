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

  constructor() {
    this.constructDeck();
  }

  /**
   * Clears the deck and discard arrays and loads the deck with one card of each rank for each suit.
   */
  public constructDeck() {
    /*
     * Unfortunately there is no good/safe way to get the length of enums
     * in TypeScript, so we construct two arrays. Since we can safely assume that the standard
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
   * Randomly pick a card from the deck and add it to the discard array.
   * @returns The picked card.
   */
  public dealACard() {
    const cardIndex = this.randomCardIndex();
    const pickedCard = this.deck[cardIndex];

    // Filter the picked card out of the deck
    this.deck = this.deck.filter((card) => {
      /*
       * If the suit and the rank of the card in the deck matches
       * the picked card, don't let it through the filter.
       */
      if (pickedCard.suit === card.suit && pickedCard.rank === card.rank) {
        return false;
      }

      return true;
    });

    this.discard.push(pickedCard);

    return pickedCard;
  }
}

export default Poker;
