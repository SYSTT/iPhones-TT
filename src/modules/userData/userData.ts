import { useState, useContext, useEffect } from 'react';

import { useAuth } from '../auth';
import { FirebaseContext } from '../firebase';
import { ProfileInfoValues } from '../../components/forms/ProfileInfoForm/types';

export function useUserData() {
  const { user } = useAuth();
  const { db, auth } = useContext(FirebaseContext);

  const [userProfileInfo, setUserProfileInfo] = useState<ProfileInfoValues>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot(querySnapshot => {
          setUserProfileInfo(querySnapshot.get('profile') || {});
          setLoading(false);
        });
      return () => unsubscribe();
    }
  }, [db, user]);

  const createNewUser = async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }: {
    [key: string]: string;
  }) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set(
          { profile: { email, firstName, lastName, phoneNumber } },
          { merge: true },
        );
    }
  };

  const loginUser = async (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const logoutUser = () => {
    auth.signOut();
  };

  return {
    userProfileInfo,
    loading,
    createNewUser,
    loginUser,
    logoutUser,
  };
}
