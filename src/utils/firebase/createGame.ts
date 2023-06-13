import { Dispatch, SetStateAction } from 'react';
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

async function createGame(
  user: User,
  setCurrentGame: Dispatch<SetStateAction<string | null>>,
  setInGame: Dispatch<SetStateAction<boolean>>,
) {
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

    const newGameRef = await addDoc(gamesReference, {
      gameName: inputGameName,
      open: true,
      players: [creator],
      creator,
      currentTurn: 0,
      createdAt: serverTimestamp(),
    } as PokerGame & { createdAt: FieldValue });

    const newGameDoc = await getDoc(newGameRef);

    await updateDoc(doc(firestore, 'users', user.uid), {
      inGame: true,
      gameId: newGameDoc.id,
    });

    setCurrentGame(newGameDoc.id);
    setInGame(true);
  } catch (e) {
    if (e instanceof Error && e.message === ErrorType.BadName) {
      // eslint-disable-next-line no-alert
      alert(ErrorType.BadName);
      throw e;
    }
    // TODO: Notify user in UI
    // eslint-disable-next-line no-console
    setCurrentGame(null);
    setInGame(false);
    throw e;
  }
}

export default createGame;
