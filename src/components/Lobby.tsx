import { User } from 'firebase/auth';

type Game = {
  title: string;
  owner: string;
  players: string[];
  open: boolean;
};

const mockData: Game[] = [
  {
    title: 'Poker Game',
    owner: 'Cassius Marcellus Coolidge',
    players: ['Dog', 'Dog', 'Dog', 'Dog'],
    open: false,
  },
  {
    title: 'The coolest game in the world',
    owner: 'Mr. Freeze',
    players: ['Mr. Freeze', 'Batman', 'Robin'],
    open: true,
  },
  {
    title: 'Mushroom kingdom',
    owner: 'Bowser',
    players: ['Bowser', 'Luigi', 'Mario', 'Princess Peach'],
    open: false,
  },
  {
    title: 'GRDJG$($#JKL#$%$(FDG$',
    owner: 'Missingno',
    players: [],
    open: true,
  },
];

interface LobbyProps {
  user: User;
}

function Lobby({ user }: LobbyProps) {
  return (
    <div id="lobby" className="border border-dashed rounded-lg p-4">
      <ul>
        {mockData.map(({
          title, owner, players, open,
        }) => (
          <li key={title + owner}>
            <div className="grid grid-cols-4 grid-rows-1">
              <span>{title}</span>
              <span>{owner}</span>
              <span>{players.join(', ')}</span>
              <div className="ml-auto mr-auto flex justify-center">
                {/* eslint-disable no-nested-ternary */}
                {user ? (
                  open ? (
                    <button
                      type="button"
                      className="w-20 rounded-sm bg-gray-400"
                    >
                      Join Game
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-20 rounded-sm bg-red-600"
                      disabled
                    >
                      Full
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
