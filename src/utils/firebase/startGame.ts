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
    gameDocument.currentTurn = -1;

    // TODO: Add further start game logic here

    await setDoc(gameDocRef, gameDocument, { merge: true });
  } catch (e) {
    alert(e);
    console.error(e);
  }
};

export default startGame;
