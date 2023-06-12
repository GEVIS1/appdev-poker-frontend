import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import createGame from '../utils/firebase/createGame';

function CreateGameButton() {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <button
        onClick={() => {
          createGame(user);
        }}
        className="w-20 bg-yellow-400 rounded-sm"
        data-testid="create-game-button"
        type="button"
      >
        Create
      </button>
    );
  }
  return <div />;
}

export default CreateGameButton;
