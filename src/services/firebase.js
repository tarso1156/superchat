import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from '../env/config';

firebase.initializeApp(config.firebase);

const auth = firebase.auth();
const firestore = firebase.firestore();

const firebaseService = { app: firebase, auth, firestore };

export { firebaseService };
