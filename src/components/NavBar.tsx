import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Menu from './Menu';

function NavBar() {
  const { user } = useContext(AuthContext);
  return (
    <div
      id="navbar"
      className="h-10 flex items-center py-7 px-2 bg-green-600 rounded-b"
    >
      <Menu />
      {user ? (
        <div className="ml-auto">
          Logged in as:
          {' '}
          {user.isAnonymous ? 'Anonymous' : user.displayName}
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
