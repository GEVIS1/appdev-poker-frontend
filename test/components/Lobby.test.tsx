import { render, screen } from '@testing-library/react';
import {
  expect,
  // beforeAll,
  // beforeEach,
  // afterEach,
  describe,
  it,
} from 'vitest';
import { faker } from '@faker-js/faker';
import {
  // signInWithEmailAndPassword,
  // signOut,
  // createUserWithEmailAndPassword,
  // UserCredential,
  // signInAnonymously,
  User,
} from 'firebase/auth';

// import { firebaseAuth } from '../../src/utils/firebase/firebase';

import Lobby from '../../src/components/Lobby';
import { LobbyContext } from '../../src/contexts/LobbyContext';
import { PokerGame } from '../../src/utils/poker/poker';

// const username = faker.internet.userName();
// const password = faker.internet.password();
// let aliceAuth: UserCredential;

// beforeAll(async () => {
//   // aliceAuth = await createUserWithEmailAndPassword(firebaseAuth, username, password);
//   aliceAuth = await signInAnonymously(firebaseAuth);
// });

// beforeEach(async () => {
//   // aliceAuth = await signInWithEmailAndPassword(firebaseAuth, username, password);
//   aliceAuth = await signInAnonymously(firebaseAuth);
// });

// afterEach(async () => {
//   signOut(firebaseAuth);
// });

const mockData: PokerGame[] = [
  {
    gameName: 'Poker Game',
    creator: 'Cassius Marcellus Coolidge',
    players: ['Dog', 'Dog', 'Dog', 'Dog'],
    open: false,
    gameId: '1234',
    currentTurn: 6,
  },
  {
    gameName: 'The coolest game in the world',
    creator: 'Mr. Freeze',
    players: ['Mr. Freeze', 'Batman', 'Robin'],
    open: true,
    gameId: '5678',
    currentTurn: 0,
  },
  {
    gameName: 'Mushroom kingdom',
    creator: 'Bowser',
    players: ['Bowser', 'Luigi', 'Mario', 'Princess Peach'],
    open: false,
    gameId: '9098',
    currentTurn: 1,
  },
  {
    gameName: 'GRDJG$($#JKL#$%$(FDG$dwad2ad2ad2a',
    creator: 'Missingno',
    players: [],
    open: true,
    gameId: '7654',
    currentTurn: 0,
  },
];

describe('Lobby tests', () => {
  it('Should render the lobby header', () => {
    render(
      <Lobby
        user={
          {
            displayName: 'Alice',
            email: 'alice@example.com',
            emailVerified: true,
            isAnonymous: false,
            uid: faker.string.alphanumeric(10),
          } as User
        }
      />,
    );

    const lobbyHeader = screen.getByTestId('lobby-header');

    // expect(aliceAuth).not.toBe(null);
    expect(lobbyHeader).not.toBe(null);
    expect(lobbyHeader.children).toHaveLength(4);
  });

  it('Should render the lobby games', () => {
    render(
      <LobbyContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          gameData: mockData,
          waitingForLobbyData: false,
        }}
      >
        <Lobby
          user={
            {
              displayName: 'Alice',
              email: 'alice@example.com',
              emailVerified: true,
              isAnonymous: false,
              uid: faker.string.alphanumeric(10),
            } as User
          }
        />
      </LobbyContext.Provider>,
    );

    const lobbyHeader = screen.getByTestId('lobby-header');
    const lobbyGames = screen.getAllByTestId('lobby-game');
    const lobbyGameName = screen.getAllByTestId('lobby-game-name')[0];
    const lobbyGameCreator = screen.getAllByTestId('lobby-game-creator')[0];
    const lobbyGamePlayers = screen.getAllByTestId('lobby-game-players')[0];

    // expect(aliceAuth).not.toBe(null);
    expect(lobbyHeader).not.toBe(null);
    expect(lobbyGames).toHaveLength(mockData.length);
    expect(lobbyGameName.textContent).toEqual(mockData[0].gameName);
    expect(lobbyGameCreator.textContent).toEqual(mockData[0].creator);
    expect(lobbyGamePlayers.textContent).toEqual(
      mockData[0].players.join(', '),
    );
    expect(lobbyGames[0].children[3].children[0]).toBeInstanceOf(
      HTMLButtonElement,
    );
  });
});
