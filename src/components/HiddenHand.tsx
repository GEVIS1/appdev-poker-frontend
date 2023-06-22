import CardComponent from './CardComponent';

function HiddenHand() {
  return (
    <div
      id="otherHand"
      className="flex flex-row gap-5 border-2 rounded-lg px-5 pb-4 pt-1 border-green-900"
    >
      {[0, 1, 2, 3, 4].map((card) => (
        <CardComponent className="text-8xl" key={card} faceDown />
      ))}
    </div>
  );
}

export default HiddenHand;
