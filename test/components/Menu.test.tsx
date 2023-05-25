import {
  describe, expect, it, vi, afterEach, beforeEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import Menu from '../../src/components/Menu';

const processingLogin = {
  state: false,

  get get() {
    return this.state;
  },
  set set(newState: boolean) {
    this.state = newState;
  },
};
const waitingForAuth = {
  state: false,

  get get() {
    return this.state;
  },
  set set(newState: boolean) {
    this.state = newState;
  },
};

// Resize window
// window.innerWidth = 200;
// window.dispatchEvent(new Event('resize'));

// waitingForAuth
// processingLogin
afterEach(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.mock('react', async () => {
    const actual = await vi.importActual<object>('react');
    return {
      ...actual,
      useContext: () => ({
        logOutUser: () => {},
        processingLogin: processingLogin.get,
        waitingForAuth: waitingForAuth.get,
      }),
    };
  });
});

describe('Menu component tests', () => {
  it('Should show spinner on login buttons while waiting for auth context', () => {
    processingLogin.set = true;
    waitingForAuth.set = true;
    render(<Menu />);

    const spinnerAnonymous = screen.getAllByTestId(
      'login-spinner-anonymous',
    )[0];
    const spinnerGoogle = screen.getAllByTestId('login-spinner-google')[0];

    expect(spinnerAnonymous).toBeVisible();
    expect(spinnerGoogle).toBeVisible();
  });

  it('Should not show spinner on login buttons while not waiting for auth context', () => {
    processingLogin.set = false;
    waitingForAuth.set = false;
    render(<Menu />);

    expect(screen.queryByTestId('login-spinner-anonymous')).toBeNull();
    expect(screen.queryByTestId('login-spinner-google')).toBeNull();
  });
});
