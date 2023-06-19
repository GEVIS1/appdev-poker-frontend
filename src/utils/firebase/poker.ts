import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export interface Player {
  name: string;
  uid: string;
}

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

class PokerGame {
  gameName: string;

  creator: Player;

  players: Array<Player>;

  hands: Array<Hand>;

  open: boolean;

  currentTurn: number;

  gameId: string;

  constructor(
    gameName: string,
    creator: Player,
    players: Array<Player>,
    gameId: string,
    hands: Array<Hand> = [],
    open = true,
    currentTurn = 0,
  ) {
    this.gameName = gameName;
    this.creator = creator;
    this.players = players;
    this.gameId = gameId;
    this.hands = hands;
    this.open = open;
    this.currentTurn = currentTurn;
  }
}

const pokerGameConverter = {
  toFirestore(pokerGame: PokerGame): DocumentData {
    return {
      gameName: pokerGame.gameName,
      creator: pokerGame.creator,
      players: pokerGame.players,
      hands: pokerGame.hands,
      open: pokerGame.open,
      currentTurn: pokerGame.currentTurn,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): PokerGame {
    const data = snapshot.data(options);
    return new PokerGame(
      data.gameName,
      data.creator,
      data.players,
      snapshot.id,
      data.hands,
      data.open,
      data.currentTurn,
    );
  },
};

export { PokerGame, pokerGameConverter };
