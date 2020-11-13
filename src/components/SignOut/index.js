import React from 'react';

import { firebaseService } from '../../services/firebase';

export default () => {
  return firebaseService.auth.currentUser && (
    <button onClick={() => firebaseService.auth.signOut()}>Sair</button>
  );
}
