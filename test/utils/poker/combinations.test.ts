import { describe, it, expect } from 'vitest';
import combinations, {
  NonNullableHand,
} from '../../../src/utils/poker/combinations';
import { Rank, Suit } from '../../../src/utils/poker/game';

/*
 * Warning: Hard-coded values galore ahead.
 * Someone should make these tests DRY.
 */

describe('combinations tests', () => {
  it('Royal Flush', () => {
    const combination = combinations[0];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Club, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });
  it('Straight Flush', () => {
    const combination = combinations[1];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.FOUR },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Four of a Kind', () => {
    const combination = combinations[2];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.THREE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Full House', () => {
    const combination = combinations[3];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.TWO },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Flush', () => {
    const combination = combinations[4];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Heart, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Club, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Heart, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
            { suit: Suit.Diamond, rank: Rank.ACE },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Straight', () => {
    const combination = combinations[5];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.TWO },
            { suit: Suit.Diamond, rank: Rank.THREE },
            { suit: Suit.Heart, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Club, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Heart, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Diamond, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.FOUR },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Three of a Kind', () => {
    const combination = combinations[6];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  it('Two Pairs', () => {
    const combination = combinations[7];
    const hands: Array<[NonNullableHand, boolean]> = [
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.THREE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.FIVE },
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.FIVE },
            { suit: Suit.Spade, rank: Rank.ACE },
          ],
        },
        true,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.THREE },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.FIVE },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.ACE },
            { suit: Suit.Spade, rank: Rank.KING },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.JACK },
            { suit: Suit.Spade, rank: Rank.TEN },
          ],
        },
        false,
      ],
      [
        {
          cards: [
            { suit: Suit.Spade, rank: Rank.TWO },
            { suit: Suit.Spade, rank: Rank.FOUR },
            { suit: Suit.Spade, rank: Rank.SEVEN },
            { suit: Suit.Spade, rank: Rank.QUEEN },
            { suit: Suit.Spade, rank: Rank.THREE },
          ],
        },
        false,
      ],
    ];

    for (let i = 0; i < hands.length; i += 1) {
      const result = combination.evaluate(hands[i][0]);
      expect(result).toBe(hands[i][1]);
    }
  });

  // it('One Pair', () => {
  //   const combination = combinations[8];
  //   const hands: Array<[NonNullableHand, boolean]> = [
  //     [{
  //     cards: [
  //       { suit: Suit.Spade, rank: Rank.ACE },
  //       { suit: Suit.Spade, rank: Rank.ACE },
  //       { suit: Suit.Spade, rank: Rank.ACE },
  //       { suit: Suit.Spade, rank: Rank.ACE },
  //       { suit: Suit.Spade, rank: Rank.ACE },
  //     ]
  //   }, true],
  //   ]

  //   for (let i = 0; i < hands.length; i += 1) {
  //     const result = combination.evaluate(hands[i][0]);
  //     expect(result).toBe(hands[i][1]);
  //   }
  // });
});
