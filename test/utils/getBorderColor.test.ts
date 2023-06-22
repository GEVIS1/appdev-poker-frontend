import { vi, describe, it, expect } from 'vitest';

import getBorderColor from '../../src/utils/getBorderColor';

const defaultCurrentTurn = false;
const defaultPlayerIndex = 0;
const defaultWinnerIndex = -1;

describe('getBorderColor tests', () => {
  it('Should return a green border by default', () => {
    const expectedColor = 'border-green-900';
    expect(getBorderColor(defaultCurrentTurn, defaultPlayerIndex, defaultWinnerIndex)).toEqual(expectedColor);
  });

  it('Should return a yellow border when its the users turn', () => {
    const expectedColor = 'border-yellow-600';
    const currentTurn = true;
    expect(getBorderColor(currentTurn, defaultPlayerIndex, defaultWinnerIndex)).toEqual(expectedColor);
  });

  it('Should return a blue border when the user is the winner', () => {
    const expectedColor = 'border-blue-500';
    const playerIndex = Math.floor(Math.random() * 4);
    const winnerIndex = playerIndex;
    expect(getBorderColor(defaultCurrentTurn, playerIndex, winnerIndex)).toEqual(expectedColor);
  });
});
