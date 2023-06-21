import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { GameContext } from '../contexts/GameContext';
import createGame from '../utils/firebase/createGame';

function CreateGameButton() {
  const { user } = useContext(AuthContext);
  const { setCurrentGame, setInGame } = useContext(GameContext);

  const handleCreateGame = async () => {
    try {
      const [gameId, inGame] = await createGame(user);
      setCurrentGame(gameId);
      setInGame(inGame);
    } catch (e) {
      setCurrentGame(null);
      setInGame(false);
      // TODO: Handle error
      alert(e);
      console.error(e);
    }
  };
  if (user) {
    return (
      <button
        onClick={handleCreateGame}
        className="w-20 bg-yellow-400 rounded-sm"
        data-testid="create-game-button"
        type="button"
      >
        Create
      </button>
    );
  }
  return <div />;
}

export default CreateGameButton;
