import React from 'react';
import { RouteChildrenProps } from 'react-router';

import { Heading } from '../../utils';
import { LoginForm } from '../../components/forms';

import { Container } from './elements';

const LoginPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const goToHome = () => {
    history.push('/');
  };

  return (
    <Container>
      <Heading>Login</Heading>
      <LoginForm onSubmit={goToHome} />
    </Container>
  );
};

export default LoginPage;
