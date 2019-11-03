import React from 'react';
import { Container } from './elements';
import { Heading } from '../../utils';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import { Divider, Alert } from 'antd';

import ProfileInfoForm from '../../components/forms/ProfileInfoForm';

import { TRADE_DESCRIPTION, BUY_DESCRIPTION } from './constants';

interface Props {
  trade?: boolean;
}

const CheckoutPage = ({ trade = false }: Props) => {
  return (
    <Container>
      <Heading>Checkout</Heading>
      <Alert
        type="info"
        showIcon
        message="Login below or enter your contact information to continue"
        description={trade ? TRADE_DESCRIPTION : BUY_DESCRIPTION}
      />
      <Divider />
      <h3>Login</h3>
      <LoginForm
        onSubmit={d => {
          console.log(d);
        }}
      />
      <Divider />
      <h3>Continue as guest</h3>
      <ProfileInfoForm
        submitText="Continue"
        onSubmit={d => {
          console.log(d);
        }}
      />
    </Container>
  );
};

export default CheckoutPage;
