import * as React from 'react';

const FirebaseContext = React.createContext(null);

export function withFirebase<TProps>(Component: React.ComponentType<TProps>) {
  return (props: TProps) => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};

export default FirebaseContext;
