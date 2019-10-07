import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

export const useAuth = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(() => {
    const user = firebase.auth.currentUser;
    return {
      loggedIn: !!user,
      user,
    };
  });

  const onChange = (user: firebase.User | null) => {
    setState({ loggedIn: !!user, user });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return state;
};
