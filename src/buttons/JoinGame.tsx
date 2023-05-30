interface JoinGameProps {
  open?: boolean;
  gameId: string;
}

function JoinGame({ open, gameId }: JoinGameProps) {
  const openColor = 'bg-green-600';
  const closedColor = 'bg-red-600';
  return (
    <button
      type="button"
      className={`w-20 rounded-sm ${open ? openColor : closedColor}`}
      onClick={() => {
        // TODO: Join game logic here
        if (open) {
          window.location.href = `/game/${gameId}`;
        } else {
          alert('Game is full!');
        }
      }}
    >
      {open ? 'Join Game' : 'Full'}
    </button>
  );
}

JoinGame.defaultProps = {
  open: true,
};

export default JoinGame;
