import * as React from 'react';
import firebaseApp, { Firebase } from './firebase';

const FirebaseContext = React.createContext<Firebase>(firebaseApp);

export default FirebaseContext;
