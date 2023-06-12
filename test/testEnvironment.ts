import { readFileSync } from 'fs';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

import firebaseConfig from '../firebaseConfig.json';
import firebaseJson from '../firebase.json';

async function getTestEnvironment() {
  const testEnvironment = await initializeTestEnvironment({
    projectId: firebaseConfig.projectId,
    firestore: {
      rules: readFileSync('firestore.rules', 'utf-8'),
    },
    hub: {
      host: firebaseJson.emulators.hub.host,
      port: firebaseJson.emulators.hub.port,
    },
  });
  return testEnvironment;
}

export default getTestEnvironment;
