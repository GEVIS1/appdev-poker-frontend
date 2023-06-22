import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import { firestore } from './firebase';
import { PokerGame } from './poker';

async function getGameData(
  gameId: string,
): Promise<[PokerGame, DocumentReference<DocumentData>]> {
  const gameDocRef = doc(firestore, 'games', gameId);
  const snapshot = await getDoc(gameDocRef);
  const gameDocument = snapshot.data();

  if (!snapshot.exists() || !gameDocument) {
    throw new Error('Could not get document.');
  }

  /*
   * Ideally this should use a firestore converter but this needs a query
   * or a typed collection reference.
   */
  return [gameDocument as PokerGame, gameDocRef];
}

export default getGameData;
