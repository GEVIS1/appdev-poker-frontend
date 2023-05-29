import {
  describe, expect, it, afterEach, vi,
} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

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

const anonymousSignInSpy = vi.fn();

const mocks = vi.hoisted(() => {
  const mockedUseContext = () => ({
    processingLogin: processingLogin.get,
    waitingForAuth: waitingForAuth.get,
    anonymousSignIn: anonymousSignInSpy,
  });

  return {
    mockedUseContext,
  };
});

vi.mock('react', async () => {
  const actual = await vi.importActual<object>('react');
  return {
    ...actual,
    useContext: mocks.mockedUseContext,
  };
});

afterEach(() => {
  waitingForAuth.set = false;
  processingLogin.set = false;
  vi.restoreAllMocks();
  vi.resetAllMocks();
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

  describe('Login Buttons', () => {
    it('Should click the anonymous login button', () => {
      render(<Menu />);
      const loginButtonAnonymous = screen.queryByTestId(
        'login-button-anonymous',
      ) as HTMLElement;
      const loginButtonMobileAnonymous = screen.queryByTestId(
        'login-button-mobile-anonymous',
      ) as HTMLElement;

      fireEvent.click(loginButtonAnonymous);
      fireEvent.click(loginButtonMobileAnonymous);

      expect(anonymousSignInSpy).toHaveBeenCalledTimes(2);
    });
  });
});
