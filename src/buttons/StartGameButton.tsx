import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import startGame from '../utils/firebase/startGame';
import { AuthContext } from '../contexts/AuthContext';

function StartGameButton() {
  const { currentGame } = useContext(GameContext);
  const { user } = useContext(AuthContext);
  return (
    <button
      type="button"
      className="w-auto h-auto p-1 rounded-md bg-green-600"
      onClick={() => {
        if (user && currentGame) startGame(user, currentGame);
      }}
    >
      Start Game
    </button>
  );
}

export default StartGameButton;
