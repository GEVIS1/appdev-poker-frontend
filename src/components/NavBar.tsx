import { useContext, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import Spinner from './Spinner';

function NavBar() {
  const {
    logOutUser, user, waitingForAuth, processingLogin, anonymousSignIn,
  } = useContext(AuthContext);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

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

  const testButtons = (
    <>
      {['Home', 'About', 'Contact', 'Address', 'Policy'].map((buttonName) => (
        <button
          className="bg-gray-400 text-white border-2 rounded-lg m-1"
          key={buttonName}
          type="button"
          onClick={() => window.console.log(`${buttonName} clicked!`)}
        >
          {buttonName}
        </button>
      ))}
    </>
  );

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

  const menu = (
    <div id="menu-container">
      <nav id="menu-spread" className="hidden sm:block">
        {testButtons}
      </nav>
      <div id="menu-hamburger" className="block sm:hidden">
        <button
          type="button"
          className=""
          onClick={() => setShowHamburgerMenu(true)}
          onPointerLeave={() => setShowHamburgerMenu(false)}
        >
          Hamburger Icon
        </button>
        {showHamburgerMenu && (
          <div className="absolute left-0 top-0 rounded-xl bg-slate-600 w-52 m-2 p-2">
            <div className="flex flex-col">{...[loginButton, testButtons]}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="navbar"
      className="h-10 flex items-center p-7 bg-green-600 rounded-b"
    >
      {menu}
    </div>
  );
}

export default NavBar;
