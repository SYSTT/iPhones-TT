import React, { useContext } from 'react';
import { RouteChildrenProps } from 'react-router';
import './LoginPage.css';

import Heading from '../Heading/Heading';
import LoginForm from './LoginForm/LoginForm';

import { FirebaseContext } from '../../modules/firebase';

function LoginPage({ history }: RouteChildrenProps) {
  const firebase = useContext(FirebaseContext);

  const login = async (email: string, password: string) => {
    await firebase.doSignInWithEmailAndPassword(email, password);
    history.push('/');
  };

  return (
    <div className="LoginPage">
      <Heading
        title="Login"
        text="Enter your email address and password below to login."
      />
      <LoginForm onSubmit={login} />
    </div>
  );
}

export default LoginPage;
