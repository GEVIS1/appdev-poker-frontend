interface JoinGameProps {
  open?: boolean;
  gameId: string;
}

function JoinGameButton({ open, gameId }: JoinGameProps) {
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
          window.history.pushState('game', 'PokerGame', `/game/${gameId}`);
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
