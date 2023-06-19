import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export interface Player {
  name: string;
  uid: string;
}
class PokerGame {
  gameName: string;

  creator: Player;

  players: Array<Player>;

  open: boolean;

  currentTurn: number;

  gameId: string;

  constructor(
    gameName: string,
    creator: Player,
    players: Array<Player>,
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
