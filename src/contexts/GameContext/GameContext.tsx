import {
  ReactElement,
  createContext,
  Dispatch,
  SetStateAction,
  // useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import {
//   Unsubscribe,
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
// } from 'firebase/firestore';

// import { firestore } from '../utils/firebase/firebase';
// import { AuthContext } from './AuthContext';
// import { PokerGame, pokerGameConverter } from '../utils/poker/poker';
import joinGame from './JoinGame.js';

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
}

export const GameContext = createContext<GameContextData>({
  inGame: false,
  setInGame: () => {},
  setCurrentGame: () => {},
  currentGame: null,
  joinGame: () => {},
});

interface GameProviderProps {
  children: ReactElement[] | ReactElement;
}

export default function GameProvider({ children }: GameProviderProps) {
  const [inGame, setInGame] = useState(false);
  const [currentGame, setCurrentGame] = useState<null | string>(null);

  // const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('inGame', inGame);
  }, [inGame]);

  // useEffect(() => {
  //   let unsubscribe: Unsubscribe | undefined;
  //   setWaitingForLobbyData(true);

  //   try {
  //     const gameDataCollectionRef = collection(firestore, 'games');

  //     if (!gameDataCollectionRef) {
  //       throw Error('Could not get reference to games collection.');
  //     }

  //     const q = query(
  //       gameDataCollectionRef,
  //       orderBy('createdAt', 'desc'),
  //     ).withConverter(pokerGameConverter);
  //     unsubscribe = onSnapshot(
  //       q,
  //       { includeMetadataChanges: true },
  //       (gamesSnapshot) => {
  //         setGameData(gamesSnapshot.docs.map((game) => game.data()));
  //       },
  //     );
  //     setWaitingForLobbyData(false);
  //   } catch (e) {
  //     // TODO: Notify user in interface that something went wrong.
  //     console.error('Error starting onSnapshot listener: ', e);
  //   }

  //   return unsubscribe;
  // }, [user]);

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
    }),
    [inGame, setInGame, currentGame, setCurrentGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
