import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import Spinner from './Spinner';
import HamburgerChips from '../assets/poker-pieces-svgrepo-com.svg';

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
      className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-24"
      onClick={user ? handleLogoutButton : handleLoginButton}
      disabled={processingLogin || waitingForAuth}
    >
      <div className="flex items-center justify-center">
        {processingLogin || waitingForAuth ? <Spinner className="w-6" /> : null}
        {user ? 'Logout' : 'Login'}
      </div>
    </button>
  );

  const menu = (
    <div id="menu-container">
      <nav id="menu-spread" className="hidden sm:block">
        {loginButton}
      </nav>
      <button type="button" className="group block sm:hidden p-2">
        <img
          alt="A stack of poker chips in the likeness of a hamburger"
          src={HamburgerChips}
          className="w-7 m-auto"
        />
        <div className="hidden group-hover:block group-hover:absolute group-hover:left-1/2 group-hover:top-1/2 group-hover:transform group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:rounded-xl group-hover:bg-green-700 group-hover:m-2 group-hover:p-4">
          <div className="grid">{loginButton}</div>
        </div>
      </button>
    </div>
  );

  return (
    <div
      id="navbar"
      className="h-10 flex items-center py-7 px-2 bg-green-600 rounded-b"
    >
      {menu}
    </div>
  );
}

export default NavBar;
