import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Player } from '../utils/poker/poker';

interface JoinGameProps {
  open?: boolean;
  players: Array<Player>;
  gameId: string;
}

function JoinGameButton({ open, players, gameId }: JoinGameProps) {
  const [joinable, setJoinable] = useState(open && players.length < 4);

  useEffect(() => {
    setJoinable(open && players.length < 4);
  }, [open, players]);

  const { joinGame } = useContext(GameContext);
  const openColor = 'bg-green-600';
  const closedColor = 'bg-red-600';
  return (
    <button
      type="button"
      className={`w-20 h-7 rounded-sm ${joinable ? openColor : closedColor}`}
      data-testid="join-game-button"
      onClick={() => {
        // TODO: Join game logic here
        if (joinable) {
          joinGame(gameId);
        } else {
          alert('Game is full!'); // eslint-disable-line no-alert
        }
      }}
    >
      {joinable ? 'Join Game' : 'Full'}
    </button>
  );
}

JoinGameButton.defaultProps = {
  open: true,
};

export default JoinGameButton;
