import { Result } from '../utils/firebase/poker';
import { Hand } from '../utils/poker/game';
import CardComponent from './CardComponent';

interface OtherHandProps {
  hand: Hand;
  playerName: string;
  playerIndex: number;
  winnerIndex: number;
  result: Result;
  borderColor: string;
}

function OtherHand({
  hand,
  playerName,
  playerIndex,
  winnerIndex,
  result,
  borderColor,
}: OtherHandProps) {
  if (hand.cards === null) {
    return <div>No cards in hand...</div>;
  }

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
        {winnerIndex === playerIndex && <div>Winner!</div>}
        {result && (
          <div>{`Score: ${result.combination} (${result.score})`}</div>
        )}
      </div>
    </div>
  );
}

export default OtherHand;
