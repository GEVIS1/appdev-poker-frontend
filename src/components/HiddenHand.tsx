import CardComponent from './CardComponent';

interface HiddenHandProps {
  keyProp: string;
}

function HiddenHand({ keyProp }: HiddenHandProps) {
  return (
    <div
      id="otherHand"
      className="flex flex-row gap-5 border-2 rounded-lg px-5 pb-4 pt-1 border-green-900"
      key={keyProp}
    >
      {[0, 1, 2, 3, 4].map((card) => (
        <CardComponent className="text-8xl" key={keyProp + card} faceDown />
      ))}
    </div>
  );
}

export default HiddenHand;
