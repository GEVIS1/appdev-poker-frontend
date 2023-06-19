import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

function LeaveGameButton() {
  const { currentGame, leaveGame } = useContext(GameContext);
  return (
    <button
      type="button"
      onClick={() => {
        if (currentGame) {
          leaveGame(currentGame);
        }
      }}
      className="w-auto h-auto p-1 rounded-md bg-red-600"
    >
      {' '}
      Leave Game
      {' '}
    </button>
  );
}

export default LeaveGameButton;
