import CardComponent from './CardComponent';

interface HiddenHandProps {
  borderColor: string;
}

function HiddenHand({ borderColor }: HiddenHandProps) {
  return (
    <div
      id="otherHand"
      className={`flex flex-row gap-5 border-2 rounded-lg px-5 pb-4 pt-1 ${borderColor}`}
    >
      {[0, 1, 2, 3, 4].map((card) => (
        <CardComponent className="text-8xl" key={card} faceDown />
      ))}
    </div>
  );
}

export default HiddenHand;
