// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import { Game } from '../components/Lobby/Lobby.d';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const generateRandomGame = (): Game => ({
  owner: faker.person.fullName(),
  title: `${capitalize(faker.word.adjective())} ${capitalize(
    faker.word.noun(),
  )}`,
  players: Array.from({ length: Math.floor(Math.random() * 5) }, () => faker.person.fullName()),
  open: faker.datatype.boolean(),
  gameId: faker.string.alphanumeric(20),
});

function CreateGame({
  setGameData,
}: {
  setGameData: React.Dispatch<React.SetStateAction<Game[]>>;
}) {
  return (
    <button
      onClick={() => {
        setGameData((prev) => [...prev, generateRandomGame()]);
      }}
      className="w-20 bg-yellow-400 rounded-sm"
      type="button"
    >
      Create
    </button>
  );
}

export default CreateGame;
