import { Rank, Suit, Card } from '../utils/poker/game';

interface CardProps {
  card?: Card;
  faceDown?: boolean;
  className?: string;
}

/**
 * Converts from our enums to the unicode characters for playing cards.
 * @param rank The rank of the card.
 * @param suit The suit of the card.
 * @returns Unicode character for the card or the back of a card.
 */
function cardToUnicode(card?: Card) {
  // If the rank or suit is undefined, return the back of a card.
  if (!card) {
    return '\u{1F0A0}';
  }

  const { rank, suit } = card;

  let suitCode;
  let rankCode;

  switch (suit) {
    case Suit.Spade:
      suitCode = 'A';
      break;
    case Suit.Heart:
      suitCode = 'B';
      break;
    case Suit.Diamond:
      suitCode = 'C';
      break;
    case Suit.Club:
      suitCode = 'D';
      break;
    default:
      suitCode = 'A';
      break;
  }
  switch (rank) {
    case Rank.ACE:
      rankCode = '1';
      break;
    case Rank.TWO:
      rankCode = '2';
      break;
    case Rank.THREE:
      rankCode = '3';
      break;
    case Rank.FOUR:
      rankCode = '4';
      break;
    case Rank.FIVE:
      rankCode = '5';
      break;
    case Rank.SIX:
      rankCode = '6';
      break;
    case Rank.SEVEN:
      rankCode = '7';
      break;
    case Rank.EIGHT:
      rankCode = '8';
      break;
    case Rank.NINE:
      rankCode = '9';
      break;
    case Rank.TEN:
      rankCode = 'A';
      break;
    case Rank.JACK:
      rankCode = 'B';
      break;
    case Rank.QUEEN:
      rankCode = 'D';
      break;
    case Rank.KING:
      rankCode = 'E';
      break;
    default:
      rankCode = '0';
      break;
  }
  const unicode = `1F0${suitCode}${rankCode}`;
  const unicodeCodePoint = parseInt(unicode, 16);

  return String.fromCodePoint(unicodeCodePoint);
}

/* `w-[${width}] max-w-[${width}] h-[${height}] max-h-[${height}]
bg-white rounded-md border-2 border-black` */

function CardComponent({ card, faceDown, className }: CardProps) {
  const cardCharacter = faceDown ? cardToUnicode() : cardToUnicode(card);
  const color = !card || card.suit === Suit.Spade || card.suit === Suit.Club
    ? ' text-black'
    : ' text-red-500';
  return <div className={className + color}>{cardCharacter}</div>;
}

CardComponent.defaultProps = {
  card: { suit: Suit.Spade, rank: Rank.ACE },
  faceDown: false,
  className: '',
};

export default CardComponent;
