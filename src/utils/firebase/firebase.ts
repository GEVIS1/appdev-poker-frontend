// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from '../../../firebaseConfig.json';

// Firebase emulator config
import emulatorConfig from '../../../firebase.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);

const firestore = initializeFirestore(app, {
  // Only enable persistent cache in production
  // When unspecified, `MemoryLocalCache` will be used by default.
  localCache: import.meta.env.PROD
    ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    : undefined,
});

// Connect to the Firebase emulator if running locally
if (import.meta.env.DEV) {
  window.console.log('Connecting to the Firebase emulator...');
  connectFirestoreEmulator(
    firestore,
    'localhost',
    emulatorConfig.emulators.firestore.port,
  );
  connectAuthEmulator(
    firebaseAuth,
    `http://localhost:${emulatorConfig.emulators.auth.port}`,
  );
}

export default app;
export { firebaseAuth, firestore };
