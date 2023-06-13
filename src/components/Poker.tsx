import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

function Poker() {
  const { currentGame, leaveGame } = useContext(GameContext);

  if (currentGame) {
    return (
      <div
        id="poker"
        data-testid="poker"
        className="flex flex-col border-2 border-green-900 rounded-lg p-4 gap-1 w-full"
      >
        <div
          id="game"
          className="flex flex-col gap-2 justify-center items-center p-6 h-gamearea"
        >
          <div>You are in a game.</div>
          <button
            type="button"
            onClick={() => leaveGame(currentGame)}
            className="w-auto h-auto p-1 rounded-md bg-red-600"
          >
            {' '}
            Leave Game
            {' '}
          </button>
        </div>
      </div>
    );
  }
  return null;
}

export default Poker;
