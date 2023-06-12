import { Dispatch, SetStateAction } from 'react';

const joinGame = (
  gameId: string,
  setCurrentGame: Dispatch<SetStateAction<string | null>>,
  setInGame: Dispatch<SetStateAction<boolean>>,
) => {
  const error = false;
  // Check if game exists
  if (error) {
    setCurrentGame(null);
    setInGame(false);
  }
  // Check if user can join game
  if (error) {
    setCurrentGame(null);
    setInGame(false);
  }
  setCurrentGame(gameId);
  setInGame(true);
  console.log('Joined game', gameId);
  window.history.pushState({}, '', gameId ?? '/');
};

export default joinGame;
