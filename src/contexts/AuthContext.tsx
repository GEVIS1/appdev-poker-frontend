import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  onSnapshot, doc, DocumentData, setDoc,
} from 'firebase/firestore';
import {
  ReactElement,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebaseAuth, firestore } from '../utils/firebase/firebase';

export interface AuthContextData {
  user: User | null;
  userData: DocumentData;
  logOutUser: (() => Promise<void>) | null;
  anonymousSignIn: (() => Promise<UserCredential | Error>) | null;
  googleSignIn: (() => Promise<UserCredential | Error>) | null;
  waitingForAuth: boolean;
  processingLogin: boolean;
  firebaseAuth: Auth;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  userData: {},
  logOutUser: null,
  waitingForAuth: true,
  processingLogin: false,
  anonymousSignIn: null,
  googleSignIn: null,
  firebaseAuth,
});

interface Props {
  children: ReactElement[] | ReactElement;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<null | DocumentData>(null);
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

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(firestore, 'users', user.uid),
        (userDoc) => {
          try {
            if (userDoc.exists()) {
              setUserData(userDoc.data());
            } else {
              const newData = {
                inGame: false,
                gameId: null,
              };
              setDoc(userDoc.ref, newData).then(() => {
                setUserData(newData);
              });
            }
          } catch (e) {
            setUserData(null);
            console.log('Caught error in user data snapshot: ', e);
          }
        },
      );
      return unsubscribe;
    }
    return () => {};
  }, [user]);

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
        'Unknown error occurred when handling anonymous sign in.',
      );
    } finally {
      setProcessingLogin(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setProcessingLogin(true);
      return await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    } catch (e) {
      if (typeof e === typeof Error) {
        return e as Error;
      }
      return new Error('Unknown error occurred when handling Google sign in.');
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
      userData,
      logOutUser,
      anonymousSignIn,
      googleSignIn,
      waitingForAuth,
      firebaseAuth,
      processingLogin,
    }),
    [user, userData, waitingForAuth, processingLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
