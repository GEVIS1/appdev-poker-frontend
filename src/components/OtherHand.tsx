import { Result } from '../utils/firebase/poker';
import getBorderColor from '../utils/getBorderColor';
import { Hand } from '../utils/poker/game';
import CardComponent from './CardComponent';

interface OtherHandProps {
  hand: Hand;
  currentTurn: boolean;
  playerName: string;
  playerIndex: number;
  winnerIndex: number;
  result: Result;
}

function OtherHand({
  hand,
  currentTurn,
  playerName,
  playerIndex,
  winnerIndex,
  result,
}: OtherHandProps) {
  if (hand.cards === null) {
    return <div>No cards in hand...</div>;
  }

  const borderColor = getBorderColor(currentTurn, playerIndex, winnerIndex);

  return (
    <div
      id="otherHand"
      className={`flex flex-col border-2 rounded-lg px-5 pb-4 pt-3 ${borderColor}`}
    >
      <div className="flex flex-row gap-5">
        {hand.cards.map((card, i) => (
          <CardComponent
            className="text-8xl"
            key={card.suit + card.rank + i.toString()}
            card={card}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between gap-5 pt-2">
        <div>{`Name: ${playerName}`}</div>
        {result ? (
          <div>{`Score: ${result.combination} (${result.score})`}</div>
        ) : null}
      </div>
    </div>
  );
}

export default OtherHand;
