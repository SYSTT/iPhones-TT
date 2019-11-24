import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from './elements';
import { Heading, RoundedButton, ButtonList } from '../../utils';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import { Divider, Alert, message, Spin } from 'antd';

import ProfileInfoForm from '../../components/forms/ProfileInfoForm';

import { TRADE_DESCRIPTION, BUY_DESCRIPTION } from './constants';
import {
  useOrders,
  useTradeOrders,
  TradeItem,
  OrderItem,
  OrderData,
  TradeOrderData,
} from '../../modules/orders';
import { ProfileInfoValues } from '../../components/forms/ProfileInfoForm/types';
import { useCart } from '../../modules/cart';
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
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  const { tradeItem, orderItem } = location.state || {};

  const sendOrderEmail = async (orders: (TradeOrderData | OrderData)[]) => {
    const response = await fetch(
      `https://us-central1-iphones-tt-176b7.cloudfunctions.net/sendMail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders }),
      },
    );
    return response.text();
  };

  const submitOrder = async (profileInfo: ProfileInfoValues) => {
    if (!tradeItem) {
      const orders: OrderData[] = cart.map(cartItem => {
        return {
          status: 'pending',
          orderItem: cartItem,
          profileInfo,
        };
      });
      await sendOrderEmail(orders);
      await addOrders(orders);
    } else {
      const tradeOrders: TradeOrderData[] = [
        {
          status: 'pending',
          tradeItem,
          orderItem,
          profileInfo,
        },
      ];
      await sendOrderEmail(tradeOrders);
      await addTradeOrders(tradeOrders);
    }

    await clearCart();
    history.push('/post-checkout');
  };

  const handleGuestSubmit = async (profileInfo: ProfileInfoValues) => {
    if (cart.length === 0 && (!tradeItem || !orderItem)) {
      return message.error("Can't submit order because your cart is empty!");
    }
    setSubmitting(true);
    const { password } = profileInfo;
    delete profileInfo.password;
    await submitOrder(profileInfo);
    if (password) {
      await createNewUser({ ...profileInfo, password });
    }
    setSubmitting(false);
  };

  const onLoginSubmit = async () => {
    setSubmitting(true);
    if (userProfileInfo !== undefined) {
      await submitOrder(userProfileInfo);
    }
    setSubmitting(false);
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
            <Spin spinning={submitting}>
              <RoundedButton type="primary" onClick={onLoginSubmit}>
                Submit Order
              </RoundedButton>
            </Spin>
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
      <ProfileInfoForm
        submitText="Submit Order"
        submitting={submitting}
        onSubmit={handleGuestSubmit}
      />
    </Container>
  );
};

export default CheckoutPage;
