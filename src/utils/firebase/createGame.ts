import {
  FieldValue,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

import { firestore } from './firebase';
import ErrorType from '../errors';
import { Player, PokerGame } from '../poker/poker';

async function createGame(user: User): Promise<[string | null, boolean]> {
  try {
    const gamesReference = collection(firestore, 'games');

    // eslint-disable-next-line no-alert
    const inputGameName = prompt('Input game name:');
    if (!inputGameName || inputGameName.length < 1) {
      throw new Error(ErrorType.BadName);
    }

    const name = user.displayName ?? 'Anonymous';

    const creator: Player = {
      name,
      uid: user.uid,
    };

    const documentData = {
      gameName: inputGameName,
      open: true,
      players: [creator],
      creator,
      currentTurn: 0,
      createdAt: serverTimestamp(),
    } as PokerGame & { createdAt: FieldValue };

    const newGameRef = await addDoc(gamesReference, documentData);

    const newGameDoc = await getDoc(newGameRef);

    await updateDoc(doc(firestore, 'users', user.uid), {
      inGame: true,
      gameId: newGameDoc.id,
    });

    return [newGameDoc.id, true];
  } catch (e) {
    if (e instanceof Error && e.message === ErrorType.BadName) {
      // eslint-disable-next-line no-alert
      alert(ErrorType.BadName);
    }
    throw e;
  }
}

export default createGame;
