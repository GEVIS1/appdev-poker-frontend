import { FieldValue, addDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

import ErrorType from '../errors';
import { PokerGame } from '../poker/poker';
import { gamesReference } from './firebase';

async function createGame(user: User) {
  try {
    // eslint-disable-next-line no-alert
    const inputGameName = prompt('Input game name:');
    if (!inputGameName || inputGameName.length < 1) {
      throw new Error(ErrorType.BadName);
    }

    const name = user.displayName ?? 'Anonymous';

    await addDoc(gamesReference, {
      gameName: inputGameName,
      open: true,
      players: [name],
      creator: name,
      currentTurn: 0,
      createdAt: serverTimestamp(),
    } as PokerGame & { createdAt: FieldValue });
  } catch (e) {
    if (e instanceof Error && e.message === ErrorType.BadName) {
      // eslint-disable-next-line no-alert
      alert(ErrorType.BadName);
    }
    // TODO: Notify user in UI
    // eslint-disable-next-line no-console
    console.error('Could not create game', e);
  }
}

export default createGame;
