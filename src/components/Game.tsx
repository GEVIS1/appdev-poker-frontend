import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import Lobby from './Lobby';
import LobbyProvider from '../contexts/LobbyContext';
import { GameContext } from '../contexts/GameContext';

function Game() {
  const { user } = useContext(AuthContext);
  const { inGame, currentGame, leaveGame } = useContext(GameContext);

  if (inGame)
    return (
        <div id="game" className="flex justify-center p-6 h-gamearea">
          <div>You are in a game.</div>
          <button type="button" onClick={() => leaveGame(currentGame)}> Leave Game </button>
        </div>
    );
  return (
    <div id="game" className="flex justify-center p-6 h-gamearea">
        <LobbyProvider>
          <Lobby user={user} />
        </LobbyProvider>
    </div>
  );
}

export default Game;
