import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseService } from './services/firebase';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

function App() {

  const [user] = useAuthState(firebaseService.auth);

  return (
    <div className="App">
      <header>
        <h1><span role="img" aria-label="">🔥🔥🔥Firechat🔥🔥🔥</span></h1>
        <SignOut/>
      </header>
      <section>
        { user ? <ChatRoom/> : <SignIn/> }
      </section>
    </div>
  );
}

export default App;
