import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage';

import { firebaseService } from '../../services/firebase';

export default () => {
  const dummy = useRef();

  const messagesRef = firebaseService.firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = firebaseService.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebaseService.firestore.FieldValue.serverTimestamp(),
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
        <button type='submit'><span role='img' aria-label=''>🕊️</span></button>
      </form>
    </>
  );
}
