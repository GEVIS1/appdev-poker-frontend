import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import Lobby from './Lobby';
import LobbyProvider from '../contexts/LobbyContext';
import GameProvider, { GameContext } from '../contexts/GameContext/GameContext';

function Game() {
  const { user } = useContext(AuthContext);
  const { inGame } = useContext(GameContext);

  return (
    <div id="game" className="flex justify-center p-6 h-gamearea">
      <GameProvider>
        {inGame ? (
          <div>You are in a game.</div>
        ) : (
          <LobbyProvider>
            <Lobby user={user} />
          </LobbyProvider>
        )}
      </GameProvider>
    </div>
  );
}

export default Game;
