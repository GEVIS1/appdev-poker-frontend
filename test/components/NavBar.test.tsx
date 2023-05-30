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

afterEach(() => {
  waitingForAuth.set = false;
  processingLogin.set = false;
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
  describe('Login Button Spinners', () => {
    it('Should show spinner on login buttons while waiting for auth context', () => {
      waitingForAuth.set = true;

      render(<Menu />);

      const spinnerAnonymous = screen.getByTestId('login-spinner-anonymous');
      const spinnerMobileAnonymous = screen.getByTestId(
        'login-spinner-mobile-anonymous',
      );
      const spinnerGoogle = screen.getByTestId('login-spinner-google');
      const spinnerMobileGoogle = screen.getByTestId(
        'login-spinner-mobile-google',
      );

      expect(spinnerAnonymous).toBeVisible();
      expect(spinnerGoogle).toBeVisible();
      expect(spinnerMobileAnonymous).toBeVisible();
      expect(spinnerMobileGoogle).toBeVisible();
    });

    it('Should show spinner on login buttons while processing a login', () => {
      processingLogin.set = true;

      render(<Menu />);

      const spinnerAnonymous = screen.getByTestId('login-spinner-anonymous');
      const spinnerMobileAnonymous = screen.getByTestId(
        'login-spinner-mobile-anonymous',
      );
      const spinnerGoogle = screen.getByTestId('login-spinner-google');
      const spinnerMobileGoogle = screen.getByTestId(
        'login-spinner-mobile-google',
      );

      expect(spinnerAnonymous).toBeVisible();
      expect(spinnerGoogle).toBeVisible();
      expect(spinnerMobileAnonymous).toBeVisible();
      expect(spinnerMobileGoogle).toBeVisible();
    });

    it('Should not show spinner on login buttons while not waiting for auth context or processing login', () => {
      render(<Menu />);
      expect(screen.queryByTestId('login-spinner-anonymous')).toBeNull();
      expect(screen.queryByTestId('login-spinner-google')).toBeNull();
      expect(screen.queryByTestId('login-spinner-mobile-anonymous')).toBeNull();
      expect(screen.queryByTestId('login-spinner-mobile-google')).toBeNull();
    });
  });
});
