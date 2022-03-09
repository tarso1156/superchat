import React from 'react';

import { firebaseService } from './../../services/firebase';

export default () => {
  const signInWithGoogle = () => {
    const provider = new firebaseService.app.auth.GoogleAuthProvider();
    firebaseService.auth.signInWithPopup(provider);
  };
  return (
    <button onClick={signInWithGoogle}>Logar</button>
  );
}
