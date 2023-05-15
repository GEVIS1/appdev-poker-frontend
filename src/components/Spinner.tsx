import PokerChip from '../assets/poker-chip-svgrepo-com.svg';

interface SpinnerProps {
  className?: string;
}

function Spinner({ className }: SpinnerProps) {
  return (
    <div className={`spinner ${className}`} role="status">
      <img alt="A poker chip" src={PokerChip} />
    </div>
  );
}

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
