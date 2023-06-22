import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { Hand } from '../poker/game';

export interface Player {
  name: string;
  uid: string;
}

export interface Result {
  score: number;
  combination: string;
}

class PokerGame {
  gameName: string;

  creator: Player;

  players: Array<Player>;

  hands: Array<Hand>;

  open: boolean;

  currentTurn: number;

  results: Array<Result>;

  gameId: string;

  constructor(
    gameName: string,
    creator: Player,
    players: Array<Player>,
    gameId: string,
    hands: Array<Hand> = [],
    open = true,
    currentTurn = 0,
    results = [],
  ) {
    this.gameName = gameName;
    this.creator = creator;
    this.players = players;
    this.gameId = gameId;
    this.hands = hands;
    this.open = open;
    this.currentTurn = currentTurn;
    this.results = results;
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
      results: pokerGame.results,
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
      data.results,
    );
  },
};

export { PokerGame, pokerGameConverter };
