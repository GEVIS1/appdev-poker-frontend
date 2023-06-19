import { useContext } from 'react';
import { DocumentData } from 'firebase/firestore';
import { GameContext } from '../contexts/GameContext';
import LeaveGameButton from '../buttons/LeaveGameButton';
import { Player } from '../utils/poker/poker';

function Poker() {
  const { currentGame, gameData } = useContext(GameContext);

  const renderGameData = (gameInfo: DocumentData) => (
    <div>
      {!gameInfo.open && <h1 className="text-5xl">Game Started</h1>}
      <br />
      <p>{`Game Name: ${gameInfo.gameName}`}</p>
      <p>{`Creator: ${gameInfo.creator.name}`}</p>
      <p>
        {`Players: ${gameInfo.players
          .map((p: Player) => p.name)
          .join(', ')}`}
      </p>
      <p>{`Open: ${gameInfo.open ? 'Yes' : 'No'}`}</p>
      <p>{`Current Turn: ${gameInfo.currentTurn}`}</p>
      <p>{`Created At: ${gameInfo.createdAt.toDate()}`}</p>
    </div>
  );

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
          {gameData && renderGameData(gameData)}
          <LeaveGameButton />
        </div>
      </div>
    );
  }
  return null;
}

export default Poker;
