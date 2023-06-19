import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import { firestore } from './firebase';

async function getGameData(
  gameId: string,
): Promise<[DocumentData, DocumentReference<DocumentData>]> {
  const gameDocRef = doc(firestore, 'games', gameId);
  const snapshot = await getDoc(gameDocRef);
  const gameDocument = snapshot.data();

  if (!snapshot.exists() || !gameDocument) {
    throw new Error('Could not get document.');
  }

  return [gameDocument, gameDocRef];
}

export default getGameData;
