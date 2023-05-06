import { useState, useEffect } from 'react';
import './App.css';

import { provider, auth } from './Firebase';
import Home from './Home.js';

function App() {

  let [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="App">
      {(user) ? <Home user={user} />
      : <a className='login' onClick={handleLogin} href=''>Fazer login!</a>
      }
    </div>
  );
}

export default App;
