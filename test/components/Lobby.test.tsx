import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { User } from 'firebase/auth';

import Lobby from '../../src/components/Lobby';
import { LobbyContext } from '../../src/contexts/LobbyContext';
import { Player, PokerGame } from '../../src/utils/poker/poker';

const creators: Player[] = Array.from({ length: 10 }, () => ({
  name: faker.person.firstName(),
  uid: faker.string.alphanumeric(10),
}));

const players: Player[] = Array.from({ length: 8 }, () => ({
  name: faker.person.firstName(),
  uid: faker.string.alphanumeric(10),
}));

const mockData: PokerGame[] = [
  {
    gameName: 'Poker Game',
    creator: creators[0],
    players: [creators[0], ...players.slice(0, 4)],
    open: false,
    gameId: '1234',
    currentTurn: 6,
  },
  {
    gameName: 'The coolest game in the world',
    creator: creators[1],
    players: [creators[1], ...players.slice(4, 6)],
    open: true,
    gameId: '5678',
    currentTurn: 0,
  },
  {
    gameName: 'Mushroom kingdom',
    creator: creators[2],
    players: [creators[2], ...players.slice(6, 9)],
    open: false,
    gameId: '9098',
    currentTurn: 1,
  },
  {
    gameName: 'GRDJG$($#JKL#$%$(FDG$dwad2ad2ad2a',
    creator: creators[3],
    players: [creators[3]],
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

    expect(lobbyHeader).not.toBe(null);
    expect(lobbyGames).toHaveLength(mockData.length);
    expect(lobbyGameName.textContent).toEqual(mockData[0].gameName);
    expect(lobbyGameCreator.textContent).toEqual(mockData[0].creator.name);
    expect(lobbyGamePlayers.textContent).toEqual(
      mockData[0].players.map((player: Player) => player.name).join(', '),
    );
    expect(lobbyGames[0].children[3].children[0]).toBeInstanceOf(
      HTMLButtonElement,
    );
  });
});
