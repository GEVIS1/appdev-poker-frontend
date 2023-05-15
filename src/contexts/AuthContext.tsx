import {
  Auth,
  User,
  UserCredential,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import {
  ReactElement,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebaseAuth } from '../utils/firebase';

export interface AuthContextData {
  user: User | null;
  logOutUser: (() => Promise<void>) | null;
  anonymousSignIn: (() => Promise<UserCredential | Error>) | null;
  waitingForAuth: boolean;
  processingLogin: boolean;
  firebaseAuth: Auth;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  logOutUser: null,
  waitingForAuth: true,
  processingLogin: false,
  anonymousSignIn: null,
  firebaseAuth,
});

interface Props {
  children: ReactElement[] | ReactElement;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [waitingForAuth, setWaitingForAuth] = useState(true);
  const [processingLogin, setProcessingLogin] = useState(false);

  /*
   * This useEffect runs when the auth context component is mounted and continuously
   * listens for changes in the user's authentication state.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (userUpdate) => {
      try {
        setProcessingLogin(true);
        if (userUpdate) setUser(userUpdate);
        else setUser(null);
      } catch (e) {
        window.console.error(e);
        setUser(null);
      } finally {
        setWaitingForAuth(false);
        setProcessingLogin(false);
      }
    });

    return () => {
      unsubscribe();
      setWaitingForAuth(true);
    };
  }, []);

  const logOutUser = async () => {
    try {
      setProcessingLogin(true);
      await signOut(firebaseAuth);
    } catch (e) {
      if (typeof e === typeof Error) {
        throw e;
      }
      throw new Error('Unknown error occurred when handling logout.');
    } finally {
      setProcessingLogin(false);
    }
  };

  const anonymousSignIn = async () => {
    try {
      setProcessingLogin(true);
      return await signInAnonymously(firebaseAuth);
    } catch (e) {
      if (typeof e === typeof Error) {
        return e as Error;
      }
      return new Error(
        'Unknown error occurred when handling anonymous signin.',
      );
    } finally {
      setProcessingLogin(false);
    }
  };

  /*
   * Wrap the value in useMemo to prevent unnecessary re-renders.
   * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
   */
  const value = useMemo(
    () => ({
      user,
      logOutUser,
      anonymousSignIn,
      waitingForAuth,
      firebaseAuth,
      processingLogin,
    }),
    [user, waitingForAuth, processingLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
