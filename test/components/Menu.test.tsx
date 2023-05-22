import {
  describe, expect, it, vi, afterEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import Menu from '../../src/components/Menu';

// Resize window
// window.innerWidth = 200;
// window.dispatchEvent(new Event('resize'));

// waitingForAuth
// processingLogin
afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock('react', async () => {
  const actual = await vi.importActual<object>('react');

  return {
    ...actual,
    useContext: () => ({
      logOutUser: () => {},
    }),
  };
});

describe('Menu component tests', () => {
  it('Should show spinner on login buttons while waiting for auth context', () => {
    render(<Menu />);

    const spinnerAnonymous = screen.getAllByTestId(
      'login-spinner-anonymous',
    )[0];
    const spinnerGoogle = screen.getAllByTestId('login-spinner-google')[0];

    expect(spinnerAnonymous).toBeVisible();
    expect(spinnerGoogle).toBeVisible();
  });

  it('Should not show spinner on login buttons while waiting for auth context', () => {
    render(<Menu />);

    const spinnerAnonymous = screen.getAllByTestId(
      'login-spinner-anonymous',
    )[0];
    const spinnerGoogle = screen.getAllByTestId('login-spinner-google')[0];

    expect(spinnerAnonymous).not.toBeVisible();
    expect(spinnerGoogle).not.toBeVisible();
  });
});
