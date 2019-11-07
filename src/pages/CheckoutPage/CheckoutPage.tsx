import React from 'react';
import { Container } from './elements';
import { Heading } from '../../utils';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import { Divider, Alert, message } from 'antd';

import ProfileInfoForm from '../../components/forms/ProfileInfoForm';

import { TRADE_DESCRIPTION, BUY_DESCRIPTION } from './constants';
import { useOrders } from '../../modules/orders';
import { ProfileInfoValues } from '../../components/forms/ProfileInfoForm/types';
import { useCart } from '../../modules/cart';

interface Props {
  trade?: boolean;
}

const CheckoutPage = ({ trade = false }: Props) => {
  const { cart } = useCart();
  const { addOrders } = useOrders();

  const handleGuestSubmit = (profileInfo: ProfileInfoValues) => {
    if (!trade) {
      if (cart.length === 0) {
        return message.error("Can't submit order because your cart is empty!");
      }
      delete profileInfo.password;
      addOrders(
        cart.map(cartItem => {
          return {
            status: 'pending',
            orderItem: cartItem,
            profileInfo,
          };
        }),
      );
    }
  };

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
      <ProfileInfoForm submitText="Continue" onSubmit={handleGuestSubmit} />
    </Container>
  );
};

export default CheckoutPage;
