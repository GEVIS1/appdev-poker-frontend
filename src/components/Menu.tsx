import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from './Spinner';
import HamburgerChips from '../assets/poker-pieces-svgrepo-com.svg';

function Menu() {
  const {
    logOutUser,
    user,
    waitingForAuth,
    processingLogin,
    anonymousSignIn,
    googleSignIn,
  } = useContext(AuthContext);

  const handleAnonymousLoginButton = async () => {
    if (anonymousSignIn) {
      try {
        await anonymousSignIn();
      } catch (e) {
        // Todo add modal popup for error
        window.console.error(e);
      }
    }
  };

  const handleGoogleLoginButton = async () => {
    if (googleSignIn) {
      try {
        await googleSignIn();
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

  const anonymousLogin = (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded max-w-sm"
      onClick={handleAnonymousLoginButton}
      disabled={processingLogin || waitingForAuth}
    >
      <div className="flex items-center justify-center">
        {processingLogin || waitingForAuth ? (
          <Spinner className="w-6" />
        ) : (
          <div>Anonymous Login</div>
        )}
      </div>
    </button>
  );

  const googleLogin = (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded max-w-sm"
      onClick={handleGoogleLoginButton}
      disabled={processingLogin || waitingForAuth}
    >
      <div className="flex items-center justify-center">
        {processingLogin || waitingForAuth ? (
          <Spinner className="w-6" />
        ) : (
          <div>Google Login</div>
        )}
      </div>
    </button>
  );

  const logins = (
    <>
      {anonymousLogin}
      {googleLogin}
    </>
  );

  const logout = (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded max-w-sm"
      onClick={handleLogoutButton}
      disabled={processingLogin || waitingForAuth}
    >
      <div className="flex items-center justify-center">
        {processingLogin || waitingForAuth ? (
          <Spinner className="w-6" />
        ) : (
          <div>Logout</div>
        )}
      </div>
    </button>
  );

  return (
    <div id="menu-container">
      <nav id="menu-spread" className="hidden sm:flex gap-2">
        {user ? logout : logins}
      </nav>
      <button type="button" className="group block sm:hidden p-2">
        <img
          alt="A stack of poker chips in the likeness of a hamburger"
          src={HamburgerChips}
          className="w-7 m-auto"
        />
        <div className="hidden group-hover:block group-hover:absolute group-hover:left-1/2 group-hover:top-1/2 group-hover:transform group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:rounded-xl group-hover:bg-green-700 group-hover:m-2 group-hover:p-4">
          <div className="grid gap-2">{user ? logout : logins}</div>
        </div>
      </button>
    </div>
  );
}

export default Menu;
