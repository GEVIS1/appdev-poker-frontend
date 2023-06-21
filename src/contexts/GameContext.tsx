import {
  ReactElement,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import addUserToGame from '../utils/firebase/addUserToGame';
import removeUserFromGame from '../utils/firebase/removeUserFromGame';
import { AuthContext } from './AuthContext';
import { firestore } from '../utils/firebase/firebase';

export interface GameContextData {
  inGame: boolean;
  setInGame: Dispatch<SetStateAction<boolean>>;
  setCurrentGame: Dispatch<SetStateAction<string | null>>;
  currentGame: null | string;
  gameData: null | DocumentData;
  joinGame: (gameId: string) => void;
  leaveGame: (gameId: string) => void;
}

export const GameContext = createContext<GameContextData>({
  inGame: false,
  setInGame: () => {},
  setCurrentGame: () => {},
  currentGame: null,
  gameData: null,
  joinGame: () => {},
  leaveGame: () => {},
});

interface GameProviderProps {
  children: ReactElement[] | ReactElement;
}

export default function GameProvider({ children }: GameProviderProps) {
  const [inGame, setInGame] = useState(false);
  const [currentGame, setCurrentGame] = useState<null | string>(null);
  const [gameData, setGameData] = useState<null | DocumentData>(null);

  const { user, userData } = useContext(AuthContext);

  // Set the state from the userData and move to the game page if necessary
  useEffect(() => {
    if (userData) {
      setInGame(userData.inGame);
      setCurrentGame(userData.gameId);
    }
  }, [userData]);

  useEffect(() => {
    if (currentGame) {
      const unsubscribe = onSnapshot(
        doc(firestore, 'games', currentGame),
        (document) => {
          if (document.exists()) {
            setGameData(document.data());
          }
        },
      );
      return unsubscribe;
    }
    return () => {};
  }, [inGame, currentGame]);

  const joinGame = useCallback(
    (gameId: string) => {
      if (!user) {
        throw Error('Unauthenticated users can not join games.');
      }
      const canJoin = true;

      if (canJoin) {
        setCurrentGame(gameId);
        setInGame(true);
        addUserToGame(user, gameId);
      } else {
        throw new Error(`Could not join game ${gameId}`);
      }
    },
    [user, setInGame, setCurrentGame],
  );

  const leaveGame = useCallback(
    (gameId: string) => {
      if (!user) {
        throw Error('Unauthenticated users can not leave games.');
      }

      setInGame(false);
      setCurrentGame(null);
      removeUserFromGame(user, gameId);
    },
    [user, setInGame, setCurrentGame],
  );

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
      gameData,
      joinGame,
      leaveGame,
    }),
    [
      inGame,
      setInGame,
      currentGame,
      setCurrentGame,
      gameData,
      joinGame,
      leaveGame,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
