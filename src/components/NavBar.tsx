import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import Spinner from './Spinner';

function NavBar() {
  const {
    logOutUser, user, waitingForAuth, processingLogin, anonymousSignIn,
  } = useContext(AuthContext);

  const handleLoginButton = async () => {
    if (anonymousSignIn) {
      try {
        await anonymousSignIn();
      } catch (e) {
        // Todo add modal popup for error
        window.console.error(e);
      }
    }
  };
  const handleLogoutButton = () => {
    if (logOutUser) {
      logOutUser();
    }
  };

  const loginButton = (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2 w-24"
      onClick={user ? handleLogoutButton : handleLoginButton}
      disabled={processingLogin || waitingForAuth}
    >
      {/* temporary */}
      {/* eslint-disable-next-line no-nested-ternary */}
      {processingLogin || waitingForAuth ? (
        <div className="flex items-center justify-center">
          <Spinner className="w-6" />
        </div>
      ) : user ? (
        'Logout'
      ) : (
        'Login'
      )}
    </button>
  );

  return (
    <div
      id="navbar"
      className="h-10 flex items-center p-7 bg-green-600 rounded-b"
    >
      {loginButton}
    </div>
  );
}

export default NavBar;
