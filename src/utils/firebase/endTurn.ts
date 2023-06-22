import { User } from 'firebase/auth';

async function endTurn(user: User, currentGame: string): Promise<void> {
  throw new Error(
    `Function not implemented. ${JSON.stringify(user)} ${currentGame}`,
  );
}

export default endTurn;
