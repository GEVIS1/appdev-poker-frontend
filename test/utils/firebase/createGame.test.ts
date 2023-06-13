import {
  vi,
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';
import { readFileSync } from 'fs';
import { faker } from '@faker-js/faker';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebase, { firestore } from '../../../src/utils/firebase/firebase';
/* eslint-enable @typescript-eslint/no-unused-vars */

import firebaseConfig from '../../../firebaseConfig.json';
import firebaseJson from '../../../firebase.json';
import createGame from '../../../src/utils/firebase/createGame';

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

beforeEach(async () => {
  await testEnvironment.clearFirestore();
});

describe('Firebase /games permissions', () => {
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

describe('Create Game unit tests', () => {
  let mockedAliceUser: User;
  const mockedPrompt = vi.fn(() => 'Cool Game');

  beforeEach(() => {
    mockedAliceUser = {
      displayName: 'Alice',
      uid: aliceUid,
    } as User;

    vi.stubGlobal('prompt', mockedPrompt);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should successfully create a game for an authorized user', async () => {
    const docsBefore = await getDocs(collection(aliceFirestore, 'games'));
    expect(docsBefore.empty).toBe(true);
    const mockedSetCurrentGame = vi.fn();
    const mockedSetInGame = vi.fn();

    await assertSucceeds(
      createGame(mockedAliceUser, mockedSetCurrentGame, mockedSetInGame),
    );

    expect(mockedPrompt).toHaveBeenCalled();
    expect(mockedSetCurrentGame).toHaveBeenCalled();
    expect(mockedSetInGame).toHaveBeenCalled();
  });
});
