import {
  vi, expect, describe, it,
} from 'vitest';
import { readFileSync } from 'fs';
import { faker } from '@faker-js/faker';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { addDoc, collection } from 'firebase/firestore';

import firebaseConfig from '../../../firebaseConfig.json';
import firebaseJson from '../../../firebase.json';

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

const aliceUid = faker.string.alphanumeric();

const alice = testEnvironment.authenticatedContext(aliceUid, {});
const aliceFirestore = alice.firestore();

const unauthed = testEnvironment.unauthenticatedContext();
const unauthedFirestore = unauthed.firestore();

describe('Create Game unit tests', () => {
  it('Should allow a logged in user to create a game', async () => {
    const gamesReference = collection(aliceFirestore, 'games');
    await assertSucceeds(
      addDoc(gamesReference, {
        gameName: 'Cool Game',
        creator: 'Alice',
        players: ['Alice'],
        open: true,
        currentTurn: 0,
      }),
    );
  });
  it('Should not allow an unauthorized user to create a game', async () => {
    const gamesReference = collection(unauthedFirestore, 'games');
    await assertFails(
      addDoc(gamesReference, {
        gameName: 'Cool Game',
        creator: 'Alice',
        players: ['Alice'],
        open: true,
        currentTurn: 0,
      }),
    );
  });
});
