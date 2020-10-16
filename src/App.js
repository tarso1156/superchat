import React, { useRef, useState } from 'react';
import './App.css';

import firebase, { auth } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyB44LFMB173HkC3hJqCFwDXE0_5zA5rklw',
  authDomain: 'firechat-18fa5.firebaseapp.com',
  databaseURL: 'https://firechat-18fa5.firebaseio.com',
  projectId: 'firechat-18fa5',
  storageBucket: 'firechat-18fa5.appspot.com',
  messagingSenderId: '716140748003',
  appId: '1:716140748003:web:63299f8985e3e6dd0ff9d6',
  measurementId: 'G-XCXY514J1B'
});

const fbAuth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(fbAuth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
          { user ? <ChatRoom/> : <SignIn/> }
        </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    fbAuth.signInWithPopup(provider);
  };
  return (
    <button onClick={signInWithGoogle}>Logar</button>
  );
}

function SignOut() {
  return fbAuth.currentUser && (
    <button onClick={() => fbAuth.signOut()}>Sair</button>
  );
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = fbAuth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        { messages && messages.map(message => <ChatMessage key={message.id} message={message}/>)}
        <div ref={dummy}></div>
      </main>


      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}></input>
        <button type="submit">🕊️</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { uid, text, photoURL } = props.message;

  const messageClass = uid === fbAuth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
