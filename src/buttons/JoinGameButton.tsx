import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext/GameContext';

interface JoinGameProps {
  open?: boolean;
  gameId: string;
}

function JoinGameButton({ open, gameId }: JoinGameProps) {
  const { joinGame, setCurrentGame, setInGame } = useContext(GameContext);
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
          joinGame(`/game/${gameId}`, setCurrentGame, setInGame);
        } else {
          alert('Game is full!');
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
