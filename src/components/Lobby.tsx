import { useContext } from 'react';
import { User } from 'firebase/auth';

import { LobbyContext } from '../contexts/LobbyContext';

import JoinGameButton from '../buttons/JoinGameButton';
import CreateGameButton from '../buttons/CreateGameButton';

interface LobbyProps {
  user: User | null;
}

function Lobby({ user }: LobbyProps) {
  const { gameData } = useContext(LobbyContext);

  return (
    <div
      id="lobby"
      className="flex flex-col border border-dashed rounded-lg p-4 gap-3 overflow-y-scroll max-w-max"
    >
      <div className="grid gap-2 grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 p-1 bg-blue-100">
        <span>Roomname: </span>
        <span>Owner: </span>
        <span>Players: </span>
        <div className="ml-auto mr-auto flex justify-center">
          {user ? <CreateGameButton /> : null}
        </div>
      </div>
      {gameData.map(({
        gameName, gameId, creator, players, open,
      }) => (
        <div
          className="grid gap-2 grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 p-1 bg-blue-100"
          key={gameId}
        >
          <span className="overflow-ellipsis overflow-hidden">{gameName}</span>
          <span className="overflow-ellipsis overflow-hidden">{creator}</span>
          <span className="overflow-ellipsis overflow-hidden">
            {players.join(', ')}
          </span>
          <div className="ml-auto mr-auto flex justify-center">
            {user ? <JoinGameButton open={open} gameId={gameId} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lobby;
