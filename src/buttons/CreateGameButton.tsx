import { useContext } from 'react';
import { FieldValue, addDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

import { gamesReference } from '../utils/firebase/firebase';
import { PokerGame } from '../utils/poker/poker';
import { AuthContext } from '../contexts/AuthContext';
import ErrorType from '../utils/errors';

async function createGame(user: User) {
  try {
    // eslint-disable-next-line no-alert
    const inputGameName = prompt('Input game name:');
    if (!inputGameName || inputGameName.length < 1) {
      throw new Error(ErrorType.BadName);
    }

    const name = user.displayName ?? 'Anonymous';

    await addDoc(gamesReference, {
      gameName: inputGameName,
      open: true,
      players: [name],
      creator: name,
      currentTurn: 0,
      createdAt: serverTimestamp(),
    } as PokerGame & { createdAt: FieldValue });
  } catch (e) {
    if (e instanceof Error && e.message === ErrorType.BadName) {
      // eslint-disable-next-line no-alert
      alert(ErrorType.BadName);
    }
    // TODO: Notify user in UI
    // eslint-disable-next-line no-console
    console.error('Could not create game', e);
  }
}

function CreateGameButton() {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <button
        onClick={() => {
          createGame(user);
        }}
        className="w-20 bg-yellow-400 rounded-sm"
        type="button"
      >
        Create
      </button>
    );
  }
  return <div />;
}

export default CreateGameButton;
