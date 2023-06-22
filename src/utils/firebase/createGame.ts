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
import { Player, PokerGame } from './poker';
import { Rank, Suit } from '../poker/game';

async function createGame(user: User): Promise<[string | null, boolean]> {
  try {
    const gamesReference = collection(firestore, 'games');

    // eslint-disable-next-line no-alert
    const inputGameName = prompt('Input game name:');
    if (!inputGameName || inputGameName.length < 1) {
      throw new Error(ErrorType.BadName);
    }

    // If the game's name is test and we are in development mode start everyone with a hand of aces
    const startHands = inputGameName === 'test' && import.meta.env.DEV
      ? [
        { cards: Array(5).fill({ suit: Suit.Spade, rank: Rank.ACE }) },
        { cards: Array(5).fill({ suit: Suit.Spade, rank: Rank.ACE }) },
        { cards: Array(5).fill({ suit: Suit.Spade, rank: Rank.ACE }) },
        { cards: Array(5).fill({ suit: Suit.Spade, rank: Rank.ACE }) },
      ]
      : [{ cards: null }, { cards: null }, { cards: null }, { cards: null }];

    const name = user.displayName ?? 'Anonymous';

    const creator: Player = {
      name,
      uid: user.uid,
    };

    const documentData = {
      gameName: inputGameName,
      open: true,
      players: [creator],
      hands: startHands,
      creator,
      currentTurn: -1,
      results: Array(4).fill({ score: 0, combination: null }),
      createdAt: serverTimestamp(),
    } as Omit<PokerGame, 'gameId'> & { createdAt: FieldValue };

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
