import { User } from 'firebase/auth';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import getGameData from './getGameData';
import { Player } from '../poker/poker';

async function removeUserFromGame(user: User, gameId: string) {
  try {
    const [gameDocument, gameDocRef] = await getGameData(gameId);

    if (!gameDocument) {
      throw new Error('Can not find game.');
    }

    if (
      !gameDocument.players
        .map((player: Player) => player.uid)
        .includes(user.uid)
    ) {
      throw new Error('Can not leave game you are not in.');
    }

    if (
      !gameDocument.players
        .map((player: Player) => player.uid)
        .includes(user.uid)
    ) {
      throw new Error('Not in this game.');
    }

    const playerIndex = gameDocument.players.findIndex(
      (player: Player) => player.uid === user.uid,
    );

    if (playerIndex === -1) {
      throw new Error('Player not found in game.');
    }

    if (gameDocument.players.length > 1) {
      // Give someone else ownership if owner leaves
      if (gameDocument.creator.uid === user.uid) {
        const newOwner = Math.floor(Math.random() * (gameDocument.players.length - 1)) + 1;
        gameDocument.creator = gameDocument.players[newOwner];
        gameDocument.players[0] = gameDocument.players[newOwner];
      }

      // Remove player from game
      gameDocument.players.splice(playerIndex, 1);

      await setDoc(
        gameDocRef,
        {
          creator: gameDocument.creator,
          players: gameDocument.players,
        },
        { merge: true },
      );
    } else {
      // Delete game if last player leaves
      deleteDoc(gameDocRef);
    }

    await setDoc(
      doc(firestore, 'users', user.uid),
      {
        inGame: false,
        gameId: null,
      },
      { merge: true },
    );
  } catch (e) {
    console.error('Could not remove user from game: ', e);
  }
}

export default removeUserFromGame;
