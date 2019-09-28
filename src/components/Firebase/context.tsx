import * as React from 'react';
import firebaseApp, { Firebase } from './firebase';

const FirebaseContext = React.createContext<Firebase>(firebaseApp);

export function withFirebase<TProps>(Component: React.ComponentType<TProps & { firebase: Firebase }>) {
  return (props: TProps) => (
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};

export default FirebaseContext;
