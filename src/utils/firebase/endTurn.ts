import { setDoc } from 'firebase/firestore';
import Poker, { Hand } from '../poker/game';
import getGameData from './getGameData';

// user, yourIndex, currentGame, currentHand
async function endTurn(
  playerIndex: number,
  gameId: string,
  currentHand: Hand,
): Promise<void> {
  try {
    const [gameDocument, gameDocRef] = await getGameData(gameId);

    if (gameDocument.currentTurn !== playerIndex) {
      throw new Error('Only the player whose turn it is can end their turn.');
    }

    if (gameDocument.players.length < 2) {
      throw new Error('Not enough players to start the game.');
    }

    // TODO: write turn data to firestore here
    gameDocument.hands[playerIndex] = currentHand;

    /*
     * If the player is the last player in the list calculate
     * the scores and end the game by setting the turn to -1
     */
    if (playerIndex >= gameDocument.players.length - 1) {
      gameDocument.currentTurn = -1;

      // Iterate the player hands and load the results of their hands into the results field
      for (let i = 0; i < gameDocument.players.length; i += 1) {
        const [combination, score] = Poker.calculateScore(
          gameDocument.hands[i],
        );
        gameDocument.results[i] = { score, combination };
      }
    } else {
      gameDocument.currentTurn += 1;
    }

    await setDoc(gameDocRef, gameDocument, { merge: true });
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export default endTurn;
