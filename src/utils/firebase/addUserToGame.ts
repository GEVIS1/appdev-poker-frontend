import {
  User
} from 'firebase/auth';
import {
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { firestore } from './firebase';

async function addUserToGame(user: User, gameId: string) {
  try {
    const gameDocRef = doc(firestore, gameId);
    const gameDocument = (await getDoc(gameDocRef)).data()

    if (!gameDocument) {
      throw new Error('Can not find game.')
    }

    if (!gameDocument.open) {
      throw new Error('Can not join closed game.');
    }

    if (gameDocument.players.length > 4) {
      throw new Error('Can not join full game.');
    }

    if (gameDocument.playerUids.filter(uid => uid === user.uid).length > 0) {
      throw new Error('Already in this game.');
    }

    gameDocument.playerUids.push(user.uid);

    const name = user.isAnonymous ? 'Anonymous' : user.displayName

    gameDocument.players.push(name);

    await updateDoc(gameDocRef, {
      players: gameDocument.players,
      playerUids: gameDocument.playerUids,
    });

    await updateDoc(doc(firestore, 'users', user.uid), {
      inGame: true,
      gameId
    });

  } catch (e) {
    console.error('Could not add user to game: ', e);
  }
}

export default addUserToGame;