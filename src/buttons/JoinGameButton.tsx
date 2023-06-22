import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Player } from '../utils/firebase/poker';

interface JoinGameProps {
  open?: boolean;
  players: Array<Player>;
  gameId: string;
}

function ButtonLabel(joinable: boolean, open: boolean) {
  let text;
  if (joinable) {
    text = 'Join';
  } else if (!open) {
    text = 'Closed';
  } else {
    text = 'Full';
  }
  return <p>{text}</p>;
}

function JoinGameButton({ open, players, gameId }: JoinGameProps) {
  const [joinable, setJoinable] = useState(
    (open ?? false) && players.length < 4,
  );

  useEffect(() => {
    setJoinable((open ?? false) && players.length < 4);
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
        } else if (!open) {
          alert('Game is not open!'); // eslint-disable-line no-alert
        } else {
          alert('Game is full!'); // eslint-disable-line no-alert
        }
      }}
    >
      {ButtonLabel(joinable, open ?? false)}
    </button>
  );
}

JoinGameButton.defaultProps = {
  open: true,
};

export default JoinGameButton;
