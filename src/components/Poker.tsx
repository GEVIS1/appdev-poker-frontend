import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import StartGameButton from '../buttons/StartGameButton';
import LeaveGameButton from '../buttons/LeaveGameButton';
import { AuthContext } from '../contexts/AuthContext';
import PokerClass, {
  Card, Hand, Rank, Suit,
} from '../utils/poker/game';
import CardComponent from './CardComponent';

const poker = new PokerClass();

const defaultHand: Hand = poker.dealAHand();
const defaultOtherHands: Hand[] = [
  poker.dealAHand(),
  poker.dealAHand(),
  poker.dealAHand(),
];

function Poker() {
  const { currentGame, gameData } = useContext(GameContext);
  const { user } = useContext(AuthContext);
  const [isOwner, setIsOwner] = useState(
    gameData && user && gameData.creator.uid === user.uid,
  );
  const [currentHand, setCurrentHand] = useState<Hand>(defaultHand);
  const [otherHands, setOtherHands] = useState<Hand[]>(defaultOtherHands);

  useEffect(() => {
    if (gameData && user) {
      setIsOwner(gameData.creator.uid === user.uid);
    }
  }, [gameData, user]);

  if (currentGame) {
    return (
      <div
        id="poker"
        data-testid="poker"
        className="flex flex-col border-2 border-green-900 rounded-lg p-4 gap-1 w-full"
      >
        <div
          id="game"
          className="flex flex-col gap-7 justify-center items-center p-6 h-gamearea"
        >
          {otherHands.map((hand, i) => (
            <>
              <div>
                Player
                {i + 2}
              </div>
              <div
                id="otherHand"
                className="flex flex-row gap-5"
                key={hand.cards
                  .map((card: Card) => card.suit + card.rank)
                  .join('')}
              >
                {hand.cards.map((card) => (
                  <CardComponent
                    className="text-8xl"
                    key={card.suit + card.rank}
                    // card={card}
                    faceDown
                  />
                ))}
              </div>
            </>
          ))}
          <div className="flex flex-col justify-center items-center mt-auto mb-auto">
            My Hand
            <div id="myHand" className="flex flex-row gap-5">
              {currentHand.cards.map((card) => (
                <CardComponent
                  className="text-9xl"
                  key={card.suit + card.rank}
                  card={card}
                />
              ))}
            </div>
          </div>
          <div id="gameButtons" className="flex flex-row gap-2">
            {user && isOwner ? <StartGameButton /> : null}
            <LeaveGameButton />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Poker;
