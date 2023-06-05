import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

class PokerGame {
  gameName: string;

  creator: string;

  players: Array<string>;

  currentTurn: number;

  constructor(
    gameName: string,
    creator: string,
    players: Array<string>,
    currentTurn = 0,
  ) {
    this.gameName = gameName;
    this.creator = creator;
    this.players = players;
    this.currentTurn = currentTurn;
  }
}

const pokerGameConverter = {
  toFirestore(pokerGame: PokerGame): DocumentData {
    return {
      gameName: pokerGame.gameName,
      creator: pokerGame.creator,
      players: pokerGame.players,
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
      data.currentTurn,
    );
  },
};

export { PokerGame, pokerGameConverter };
