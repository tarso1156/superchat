import React from 'react';

import { firebaseService } from "../../services/firebase";

export default (props) => {
  const { uid, text, photoURL } = props.message;

  const messageClass = uid === firebaseService.auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img alt="" src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}
