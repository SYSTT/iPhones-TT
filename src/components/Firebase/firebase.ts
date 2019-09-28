import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  database: firebase.database.Database;

  constructor() {
    firebase.initializeApp(config);
    
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.database = firebase.database();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  
  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    }
  }
}

export default new Firebase();
