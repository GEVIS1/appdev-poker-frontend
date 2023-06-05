import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

class PokerGame {
  gameName: string;

  creator: string;

  players: Array<string>;

  open: boolean;

  currentTurn: number;

  gameId: string;

  constructor(
    gameName: string,
    creator: string,
    players: Array<string>,
    gameId: string,
    open = true,
    currentTurn = 0,
  ) {
    this.gameName = gameName;
    this.creator = creator;
    this.players = players;
    this.gameId = gameId;
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
      data.open,
      data.currentTurn,
    );
  },
};

export { PokerGame, pokerGameConverter };
