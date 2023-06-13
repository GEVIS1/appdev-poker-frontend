import {
  ReactElement,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react';
import addUserToGame from '../utils/firebase/addUserToGame';
import removeUserFromGame from '../utils/firebase/removeUserFromGame';
import { AuthContext } from './AuthContext';

export interface GameContextData {
  inGame: boolean;
  setInGame: Dispatch<SetStateAction<boolean>>;
  setCurrentGame: Dispatch<SetStateAction<string | null>>;
  currentGame: null | string;
  joinGame: (
    gameId: string,
    setCurrentGame: Dispatch<SetStateAction<string | null>>,
    setInGame: Dispatch<SetStateAction<boolean>>
  ) => void;
  leaveGame: (gameId: string) => void;
}

export const GameContext = createContext<GameContextData>({
  inGame: false,
  setInGame: () => {},
  setCurrentGame: () => {},
  currentGame: null,
  joinGame: () => {},
  leaveGame: () => {},
});

interface GameProviderProps {
  children: ReactElement[] | ReactElement;
}

export default function GameProvider({ children }: GameProviderProps) {
  const [inGame, setInGame] = useState(false);
  const [currentGame, setCurrentGame] = useState<null | string>(null);

  const { user, userData } = useContext(AuthContext);

  const joinGame = (gameId: string) => {
    if (!user) {
      throw Error('Unauthenticated users can not join games.');
    }

    // TODO: Ascertain canJoin boolean
    const canJoin = true;

    if (canJoin) {
      setCurrentGame(gameId);
      setInGame(true);
      addUserToGame(user, gameId);
      console.log('Joined game', gameId);
      window.history.pushState({}, '', gameId);
    } else {
      throw new Error(`Could not join game ${gameId}`);
    }
  };

  const leaveGame = (gameId: string) => {
    if (!user) {
      throw Error('Unauthenticated users can not leave games.');
    }

    setInGame(false);
    setCurrentGame(null);
    removeUserFromGame(user, gameId);
    console.log('Left game: ', gameId);
    window.history.pushState({}, '', '/');
  };

  /*
   * Wrap the value in useMemo to prevent unnecessary re-renders.
   * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
   */
  const value = useMemo(
    () => ({
      inGame,
      setInGame,
      currentGame,
      setCurrentGame,
      joinGame,
      leaveGame,
    }),
    [inGame, setInGame, currentGame, setCurrentGame]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
