import { useContext } from 'react';

import { AuthContext } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';

function App() {
  const { user, waitingForAuth, processingLogin } = useContext(AuthContext);

  const content = (
    <div className="m-4 flex justify-center items-center h-screen">
      {!user ? <div>Not logged in...</div> : <div>Please add Game here</div>}
    </div>
  );

  return (
    <div id="app" className="bg-green-800 h-max">
      <NavBar />
      {!waitingForAuth && !processingLogin ? (
        content
      ) : (
        <div className="flex justify-center items-center h-gamearea">
          <Spinner className="w-20" />
        </div>
      )}
    </div>
  );
}

export default App;
