import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import Lobby from './Lobby';
import LobbyProvider from '../contexts/LobbyContext';

function Game() {
  const { user } = useContext(AuthContext);
  return (
    <div id="game" className="flex justify-center p-6 h-gamearea">
      <LobbyProvider>
        <Lobby user={user} />
      </LobbyProvider>
    </div>
  );
}

export default Game;
