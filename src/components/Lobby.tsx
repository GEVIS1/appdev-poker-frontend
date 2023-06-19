import { useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { LobbyContext } from '../contexts/LobbyContext';

import JoinGameButton from '../buttons/JoinGameButton';
import CreateGameButton from '../buttons/CreateGameButton';

interface LobbyProps {
  user: User | null;
}

function Lobby({ user }: LobbyProps) {
  const { gameData } = useContext(LobbyContext);

  const [gridLayout, setGridLayout] = useState({
    header: 'grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1',
    item: 'grid-cols-2 md:grid-cols-4',
  });

  useEffect(() => {
    if (!user) {
      setGridLayout({
        header: 'grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1',
        item: 'grid-cols-2 md:grid-cols-3',
      });
    } else {
      setGridLayout({
        header: 'grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1',
        item: 'grid-cols-2 md:grid-cols-4',
      });
    }
  }, [user]);

  return (
    <div
      id="lobby"
      data-testid="lobby"
      className="flex flex-col border-2 border-green-900 rounded-lg p-4 gap-1 w-full"
    >
      <div
        className={`grid gap-2 ${gridLayout.header} p-2 bg-green-600 rounded-sm`}
        data-testid="lobby-header"
      >
        <span>Roomname: </span>
        <span>Owner: </span>
        <span>Players: </span>
        <div className="ml-auto mr-auto flex justify-center">
          {user ? <CreateGameButton /> : null}
        </div>
      </div>
      <div
        data-testid="lobby-games-container"
        className="flex flex-col gap-1 overflow-auto no-scrollbar"
      >
        {gameData.map(({
          gameName, gameId, creator, players, open,
        }) => (
          <div
            className={`grid gap-2 ${gridLayout.item} p-2 bg-green-700 rounded-md transition-all`}
            key={gameId}
            data-testid="lobby-game"
          >
            <span
              data-testid="lobby-game-name"
              className="overflow-ellipsis overflow-hidden"
            >
              {gameName}
            </span>
            <span
              data-testid="lobby-game-creator"
              className="overflow-ellipsis overflow-hidden"
            >
              {creator.name}
            </span>
            <span
              data-testid="lobby-game-players"
              className="overflow-ellipsis overflow-hidden"
            >
              {players.map((player) => player.name).join(', ')}
            </span>
            <div className="ml-auto mr-auto flex justify-center items-end">
              {user ? (
                <JoinGameButton open={open} players={players} gameId={gameId} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lobby;
