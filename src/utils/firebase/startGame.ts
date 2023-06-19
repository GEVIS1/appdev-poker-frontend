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

    if (!gameDocument.open) {
      throw new Error('Game is already started.');
    }

    gameDocument.open = false;

    await setDoc(gameDocRef, gameDocument, { merge: true });
  } catch (e) {
    console.error(e);
  }
};

export default startGame;
