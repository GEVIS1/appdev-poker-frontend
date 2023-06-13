import {
  User
} from 'firebase/auth';
import {
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { firestore } from './firebase';

async function removeUserFromGame(user: User, gameId: string) {
  try {
    const gameDocRef = doc(firestore, gameId);
    const gameDocument = (await getDoc(gameDocRef)).data()

    if (!gameDocument) {
      throw new Error('Can not find game.')
    }

    if (!gameDocument.open) {
      throw new Error('Can not leave closed game.');
    }
    
    if (gameDocument.playerUids.filter(uid => uid === user.uid).length < 1) {
      throw new Error('Not in this game.');
    }

    gameDocument.playerUids = gameDocument.playerUids.filter(uid => uid !== user.uid);

    const name = user.isAnonymous ? 'Anonymous' : user.displayName

    if (name === 'Anonymous') {
      let removed = false;

      // Filter out first instance of anonymous
      gameDocument.players = gameDocument.players.filter(playerName => {
        if (!removed && playerName === 'Anonymous') {
          removed = true;
          return false;
        }
        return true;
      })
    } else {
      gameDocument.players = gameDocument.players.filter(playerName => playerName !== name);
    }

    await updateDoc(gameDocRef, {
      players: gameDocument.players,
      playerUids: gameDocument.playerUids,
    });

    await updateDoc(doc(firestore, 'users', user.uid), {
      inGame: false,
      gameId: null,
    });

  } catch (e) {
    console.error('Could not remove user from game: ', e);
  }
}

export default removeUserFromGame;