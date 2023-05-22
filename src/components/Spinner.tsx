import PokerChip from '../assets/poker-chip-svgrepo-com.svg';

interface SpinnerProps {
  className?: string;
  testId?: string;
}

function Spinner({ className, testId }: SpinnerProps) {
  return (
    <div className={`spinner ${className}`} role="status" data-testid={testId}>
      <img alt="A poker chip" src={PokerChip} />
    </div>
  );
}

Spinner.defaultProps = {
  className: '',
  testId: '',
};

export default Spinner;
