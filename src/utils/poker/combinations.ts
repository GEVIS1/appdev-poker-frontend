import { Card, Hand } from './game';

/**
 * The possible results of a hand.
 * Spaced out by increments of 100 so that
 * we can break ties by adding the high card to the result.
 *
 * E.G: Player 1 has a pair of 2s and player 2 has a pair of 3s.
 * This is normally a tie, but we can break the tie by adding the high card.
 * Player 1 has a high card of 10 and player 2 has a high card of 9.
 * Player 1 wins with a score of 110. Player 2 has a score of 109.
 */
export enum HandResult {
  HighCard = 0,
  OnePair = 100,
  TwoPairs = 200,
  Three = 300,
  Straight = 400,
  Flush = 500,
  FullHouse = 600,
  Four = 700,
  StraightFlush = 800,
  RoyalFlush = 900,
}

interface Combination {
  name: string;
  function: (hand: Hand) => boolean;
  score: number;
}

/**
 * Utility curry function to test if a hand has a pair with a given card.
 * @param hand The hand to test.
 * @returns A predicate function that tests if a hand has a pair with the given card.
 */
const isPair = (hand: Hand) => (card: Card) => hand.cards.filter(
  (c: Card) => c.rank === card.rank,
).length === 2;

/**
 * Tests for each card if there is another card with the same rank.
 * I.E. the length of the hand filtered by a given card is equal to 2.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has one pair.
 */
const onePair = (hand: Hand): boolean => hand.cards.some(isPair(hand));

/**
 * Tests for each card if there is a pair and that there are two pairs total
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has two pairs.
 */
const twoPairs = (hand: Hand): boolean => {
  const pairs = hand.cards.filter(isPair(hand));

  return pairs.length === 2;
};

/**
 * Tests for the hand having three of a kind.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has three of a kind.
 */
const threeOfAKind = (hand: Hand): boolean => hand.cards.some(
  (card) => hand.cards.filter((c) => c.rank === card.rank).length === 3,
);

/**
 * Tests for the hand having a straight.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has a straight.
 */
const straight = (hand: Hand): boolean => {
  const sorted = hand.cards.sort((a, b) => a.rank - b.rank);

  /*
   * If each card in the sorted array's next card is one rank higher, it's a straight.
   * So if they don't match, it's not a straight and we can return false.
   */
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (sorted[i].rank + 1 !== sorted[i + 1].rank) {
      return false;
    }
  }

  return true;
};

/**
 * Tests for the hand having a flush by checking if each card has the same suit.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has a flush.
 */
const flush = (hand: Hand): boolean => hand.cards.every(
  (card) => card.suit === hand.cards[0].suit,
);

/**
 * Tests for a full house by checking if there is a three of a kind and a pair.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has a full house.
 */
const fullHouse = (hand: Hand): boolean => threeOfAKind(hand) && onePair(hand);

/**
 * Tests for a four of a kind by checking if there is a card that appears four times.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has four of a kind.
 */
const fourOfAKind = (hand: Hand): boolean => hand.cards.some(
  (card) => hand.cards.filter((c) => c.rank === card.rank).length === 4,
);

/**
 * Tests for a straight flush by checking if the hand has a straight and a flush.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has a straight flush.
 */
const straightFlush = (hand: Hand): boolean => straight(hand) && flush(hand);

/**
 * Tests for a royal flush by checking if the hand has a straight flush and a 10, J, Q, K, and A.
 * @param hand The hand to test.
 * @returns A boolean indicating if the hand has a royal flush.
 */
const royalFlush = (hand: Hand): boolean => straightFlush(hand)
  && hand.cards.some((card) => card.rank === 14)
  && hand.cards.some((card) => card.rank === 13)
  && hand.cards.some((card) => card.rank === 12)
  && hand.cards.some((card) => card.rank === 11)
  && hand.cards.some((card) => card.rank === 10);

const combinations: Array<Combination> = [
  {
    name: 'Royal Flush',
    function: royalFlush,
    score: HandResult.RoyalFlush,
  },
  {
    name: 'Straight Flush',
    function: straightFlush,
    score: HandResult.StraightFlush,
  },
  {
    name: 'Four of a Kind',
    function: fourOfAKind,
    score: HandResult.Four,
  },
  {
    name: 'Full House',
    function: fullHouse,
    score: HandResult.FullHouse,
  },
  {
    name: 'Flush',
    function: flush,
    score: HandResult.Flush,
  },
  {
    name: 'Straight',
    function: straight,
    score: HandResult.Straight,
  },
  {
    name: 'Three of a Kind',
    function: threeOfAKind,
    score: HandResult.Three,
  },
  {
    name: 'Two Pairs',
    function: twoPairs,
    score: HandResult.TwoPairs,
  },
  {
    name: 'One Pair',
    function: onePair,
    score: HandResult.OnePair,
  },
];

export default combinations;
