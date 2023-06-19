import { User } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';
import getGameData from './getGameData';
import { Player } from './poker';

async function addUserToGame(user: User, gameId: string) {
  try {
    const [gameDocument, gameDocRef] = await getGameData(gameId);

    if (!gameDocument) {
      throw new Error('Can not find game.');
    }

    if (!gameDocument.open) {
      throw new Error('Can not join closed game.');
    }

    if (gameDocument.players.length > 3) {
      throw new Error('Can not join full game.');
    }

    if (
      gameDocument.players
        .map((player: Player) => player.uid)
        .includes(user.uid)
    ) {
      throw new Error('Already in this game.');
    }

    const newPlayer: Player = {
      name: user.displayName ?? 'Anonymous',
      uid: user.uid,
    };

    gameDocument.players.push(newPlayer);

    await updateDoc(gameDocRef, {
      players: gameDocument.players,
    });

    await updateDoc(doc(firestore, 'users', user.uid), {
      inGame: true,
      gameId,
    });
  } catch (e) {
    console.error('Could not add user to game: ', e);
  }
}

export default addUserToGame;
