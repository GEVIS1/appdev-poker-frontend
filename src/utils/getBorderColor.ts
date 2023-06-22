function getBorderColor(currentTurn: boolean, playerIndex: number, winnerIndex: number): string {
  if (currentTurn) {
    return 'border-yellow-600';
  }
  if (winnerIndex === playerIndex) {
    return 'border-blue-500';
  }
  return 'border-green-900';
}

export default getBorderColor;
