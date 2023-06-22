import { Rank, Suit } from '../utils/poker/game';
import CardComponent from './CardComponent';

function AllCards() {
  return (
    <div className="m-2 rounded-md bg-white w-fit p-3 flex flex-col">
      {[Suit.Spade, Suit.Heart, Suit.Club, Suit.Diamond].map((suit) => (
        <>
          <p className="m-2">{suit}</p>
          <div key={suit} className="flex-row flex">
            {[
              Rank.ACE,
              Rank.TWO,
              Rank.THREE,
              Rank.FOUR,
              Rank.FIVE,
              Rank.SIX,
              Rank.SEVEN,
              Rank.EIGHT,
              Rank.NINE,
              Rank.TEN,
              Rank.JACK,
              Rank.QUEEN,
              Rank.KING,
            ].map((rank) => (
              <div key={rank} className="flex flex-col">
                <div className="text-9xl">
                  <CardComponent key={rank} card={{ suit, rank }} />
                </div>
                <p className="flex content-center justify-center">
                  {rank !== 14 ? rank : 1}
                </p>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}

export default AllCards;
