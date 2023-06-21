import { useContext } from 'react';

import { AuthContext } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';
import Main from './components/Main';
import GameProvider from './contexts/GameContext';

function App() {
  const { waitingForAuth, processingLogin } = useContext(AuthContext);

  return (
    <div id="app" className="bg-green-800 h-max">
      <NavBar />
      {!waitingForAuth && !processingLogin ? (
        <GameProvider>
          <Main />
        </GameProvider>
      ) : (
        <div className="flex justify-center items-center h-gamearea">
          <Spinner className="w-20" />
        </div>
      )}
    </div>
  );
}

export default App;
