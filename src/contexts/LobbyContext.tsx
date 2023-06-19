import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { firestore } from '../utils/firebase/firebase';
import { AuthContext } from './AuthContext';
import { PokerGame, pokerGameConverter } from '../utils/firebase/poker';

export interface LobbyContextData {
  gameData: PokerGame[];
  waitingForLobbyData: boolean;
}

export const LobbyContext = createContext<LobbyContextData>({
  gameData: [],
  waitingForLobbyData: true,
});

interface LobbyProviderProps {
  children: ReactElement[] | ReactElement;
}

export default function LobbyProvider({ children }: LobbyProviderProps) {
  const [waitingForLobbyData, setWaitingForLobbyData] = useState(true);
  const [gameData, setGameData] = useState<PokerGame[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    setWaitingForLobbyData(true);

    try {
      const gameDataCollectionRef = collection(firestore, 'games');

      if (!gameDataCollectionRef) {
        throw Error('Could not get reference to games collection.');
      }

      const q = query(
        gameDataCollectionRef,
        orderBy('createdAt', 'desc'),
      ).withConverter(pokerGameConverter);
      unsubscribe = onSnapshot(
        q,
        { includeMetadataChanges: true },
        (gamesSnapshot) => {
          setGameData(gamesSnapshot.docs.map((game) => game.data()));
        },
      );
      setWaitingForLobbyData(false);
    } catch (e) {
      // TODO: Notify user in interface that something went wrong.
      console.error('Error starting onSnapshot listener: ', e);
    }

    return unsubscribe;
  }, [user]);

  /*
   * Wrap the value in useMemo to prevent unnecessary re-renders.
   * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
   */
  const value = useMemo(
    () => ({
      gameData,
      waitingForLobbyData,
    }),
    [waitingForLobbyData, gameData],
  );

  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
}
