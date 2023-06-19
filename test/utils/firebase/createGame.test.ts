import {
  vi,
  expect,
  describe,
  it,
  beforeEach,
  beforeAll,
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
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

import {
  firestore,
} from '../../../src/utils/firebase/firebase';

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
const aliceName = 'Alice';
const aliceFirestore = alice.firestore();

const unauthed = testEnvironment.unauthenticatedContext();
const unauthedFirestore = unauthed.firestore();

const player = {
  name: aliceName,
  uid: aliceUid,
};
const basicGame = {
  gameName: 'Cool Game',
  creator: player,
  players: [
    player,
  ],
  open: true,
  currentTurn: 0,
  createdAt: serverTimestamp(),
};

beforeEach(async () => {
  await testEnvironment.clearFirestore();
});

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Firebase /games permissions', () => {
  it('Should allow a logged in user to create a game', async () => {
    const gamesReference = collection(aliceFirestore, 'games');
    await assertSucceeds(addDoc(gamesReference, basicGame));
  });

  it('Should not allow an unauthorized user to create a game', async () => {
    const gamesReference = collection(unauthedFirestore, 'games');
    await assertFails(addDoc(gamesReference, basicGame));
  });
});

describe('Create Game unit tests', () => {
  it('Should successfully create a game for an authorized user', async () => {
    const docsBefore = await getDocs(collection(aliceFirestore, 'games'));
    expect(docsBefore.empty).toBe(true);

    const gameName = faker.string.alphanumeric();
    const mockedPrompt = vi.fn(() => gameName);
    vi.stubGlobal('prompt', mockedPrompt);

    const game = {
      gameName,
      open: true,
      players: [player],
      creator: player,
      currentTurn: 0,
    };

    const user = player as unknown as User;

    await assertSucceeds(createGame(user));

    expect(mockedPrompt).toHaveBeenCalled();
    const docsAfter = await getDocs(collection(firestore, 'games'));
  });
});
