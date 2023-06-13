import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

interface JoinGameProps {
  open?: boolean;
  gameId: string;
}

function JoinGameButton({ open, gameId }: JoinGameProps) {
  const { joinGame } = useContext(GameContext);
  const openColor = 'bg-green-600';
  const closedColor = 'bg-red-600';
  return (
    <button
      type="button"
      className={`w-20 h-7 rounded-sm ${open ? openColor : closedColor}`}
      data-testid="join-game-button"
      onClick={() => {
        // TODO: Join game logic here
        if (open) {
          joinGame(`/games/${gameId}`);
        } else {
          
          alert('Game is full!'); // eslint-disable-line no-alert
        }
      }}
    >
      {open ? 'Join Game' : 'Full'}
    </button>
  );
}

JoinGameButton.defaultProps = {
  open: true,
};

export default JoinGameButton;
