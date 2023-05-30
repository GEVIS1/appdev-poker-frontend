import { User } from 'firebase/auth';
import { useState } from 'react';

import JoinGame from '../../buttons/JoinGame';
import CreateGame from '../../buttons/CreateGame';

import { Game } from './Lobby.d';

const mockData: Game[] = [
  {
    title: 'Poker Game',
    owner: 'Cassius Marcellus Coolidge',
    players: ['Dog', 'Dog', 'Dog', 'Dog'],
    open: false,
    gameId: '1234',
  },
  {
    title: 'The coolest game in the world',
    owner: 'Mr. Freeze',
    players: ['Mr. Freeze', 'Batman', 'Robin'],
    open: true,
    gameId: '5678',
  },
  {
    title: 'Mushroom kingdom',
    owner: 'Bowser',
    players: ['Bowser', 'Luigi', 'Mario', 'Princess Peach'],
    open: false,
    gameId: '9098',
  },
  {
    title: 'GRDJG$($#JKL#$%$(FDG$dwad2ad2ad2a',
    owner: 'Missingno',
    players: [],
    open: true,
    gameId: '7654',
  },
];

interface LobbyProps {
  user: User | null;
}

function Lobby({ user }: LobbyProps) {
  const [gameData, setGameData] = useState<Game[]>(mockData);

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
          {user ? <CreateGame setGameData={setGameData} /> : null}
        </div>
      </div>
      {gameData.map(({
        title, owner, players, open, gameId,
      }) => (
        <div
          className="grid gap-2 grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 p-1 bg-blue-100"
          key={title + owner}
        >
          <span className="overflow-ellipsis overflow-hidden">{title}</span>
          <span className="overflow-ellipsis overflow-hidden">{owner}</span>
          <span className="overflow-ellipsis overflow-hidden">
            {players.join(', ')}
          </span>
          <div className="ml-auto mr-auto flex justify-center">
            {user ? <JoinGame open={open} gameId={gameId} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lobby;
