import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import Lobby from './Lobby/Lobby';

function Game() {
  const { user } = useContext(AuthContext);
  return (
    <div id="game" className="flex justify-center pt-6 h-gamearea">
      <Lobby user={user} />
    </div>
  );
}

export default Game;
