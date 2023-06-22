import { User } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import getGameData from './getGameData';

const startGame = async (user: User, gameId: string) => {
  try {
    const [gameDocument, gameDocRef] = await getGameData(gameId);

    if (gameDocument.creator.uid !== user.uid) {
      throw new Error('Only the owner can start the game.');
    }

    if (gameDocument.players.length < 2) {
      throw new Error('Not enough players to start the game.');
    }

    if (gameDocument.open) {
      gameDocument.open = false;
    }
    gameDocument.currentTurn = 0;

    gameDocument.results = Array(4).fill({ score: 0, combination: null });

    await setDoc(gameDocRef, gameDocument, { merge: true });
  } catch (e) {
    alert(e);
    console.error(e);
  }
};

export default startGame;
