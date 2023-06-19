import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import Lobby from './Lobby';
import Poker from './Poker';
import LobbyProvider from '../contexts/LobbyContext';
import { GameContext } from '../contexts/GameContext';

function Game() {
  const { user } = useContext(AuthContext);
  const { inGame } = useContext(GameContext);

  if (inGame) {
    return (
      <div id="game" className="flex justify-center p-6 h-gamearea">
        <Poker />
      </div>
    );
  }
  return (
    <div id="game" className="flex justify-center p-6 h-gamearea">
      <LobbyProvider>
        <Lobby user={user} />
      </LobbyProvider>
    </div>
  );
}

export default Game;