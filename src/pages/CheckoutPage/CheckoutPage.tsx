import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from './elements';
import { Heading, RoundedButton, ButtonList } from '../../utils';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import { Divider, Alert, message } from 'antd';

import ProfileInfoForm from '../../components/forms/ProfileInfoForm';

import { TRADE_DESCRIPTION, BUY_DESCRIPTION } from './constants';
import { useOrders } from '../../modules/orders';
import { ProfileInfoValues } from '../../components/forms/ProfileInfoForm/types';
import { useCart } from '../../modules/cart';
import {
  useTradeOrders,
  TradeItem,
  OrderItem,
} from '../../modules/tradeOrders';
import { useUserData } from '../../modules/userData';

const CheckoutPage = () => {
  const location = useLocation<{
    tradeItem: TradeItem;
    orderItem: OrderItem;
  }>();
  const { cart, clearCart } = useCart();
  const { addOrders } = useOrders();
  const { addTradeOrders } = useTradeOrders();
  const { userProfileInfo, createNewUser } = useUserData();
  const history = useHistory();

  const { tradeItem, orderItem } = location.state || {};

  const submitOrder = async (profileInfo: ProfileInfoValues) => {
    if (!tradeItem) {
      await addOrders(
        cart.map(cartItem => {
          return {
            status: 'pending',
            orderItem: cartItem,
            profileInfo,
          };
        }),
      );
    } else {
      await addTradeOrders([
        {
          status: 'pending',
          tradeItem,
          orderItem,
          profileInfo,
        },
      ]);
    }
    await clearCart();
    history.push('/post-checkout');
  };

  const handleGuestSubmit = async (profileInfo: ProfileInfoValues) => {
    if (cart.length === 0 && (!tradeItem || !orderItem)) {
      return message.error("Can't submit order because your cart is empty!");
    }
    const { password } = profileInfo;
    delete profileInfo.password;
    await submitOrder(profileInfo);
    if (password) {
      await createNewUser({ ...profileInfo, password });
    }
  };

  const onLoginSubmit = () => {
    if (userProfileInfo !== undefined) {
      submitOrder(userProfileInfo);
    }
  };

  return (
    <Container>
      <Heading>Checkout</Heading>
      <Alert
        type="info"
        showIcon
        message="Login below or enter your contact information to continue"
        description={tradeItem ? TRADE_DESCRIPTION : BUY_DESCRIPTION}
      />
      <Divider />
      {userProfileInfo ? (
        <>
          <h3>You&#39;re already logged in</h3>
          <ButtonList center>
            <RoundedButton
              type="primary"
              onClick={() => submitOrder(userProfileInfo)}
            >
              Submit Order
            </RoundedButton>
          </ButtonList>
        </>
      ) : (
        <>
          <h3>Login</h3>
          <LoginForm onSubmit={onLoginSubmit} submitText="Login & submit" />
        </>
      )}
      <Divider />
      <h3>Continue as guest</h3>
      <ProfileInfoForm submitText="Submit Order" onSubmit={handleGuestSubmit} />
    </Container>
  );
};

export default CheckoutPage;
