import React, { useState } from 'react';
import './CheckoutPage.css';

import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import ContactForm from './../forms/ContactForm';

import { useStateWithLocalStorage } from './../../utils/hooks';
import { price } from './../../utils/templateLiteralTags';

const OrderSummary = ({ cart }) => {
  const orderList = cart.map(order => (
    <div
      key={order.item.model + order.item.memory}
      className="OrderSummary-order"
    >
      <p>
        {order.quantity}x {order.item.model} {order.item.memory}GB
      </p>
      <p>{price`${order.item.price * order.quantity}`}</p>
    </div>
  ));
  const total = cart.reduce(
    (acc, cur) => acc + cur.item.price * cur.quantity,
    0,
  );
  return (
    <div className="OrderSummary">
      <div className="OrderSummary-list">
        {orderList}
        {orderList.length === 0 && (
          <p className="OrderSummary-empty">Your cart is empty!</p>
        )}
      </div>
      <h3 className="OrderSummary-total">Total: {price`${total}`}</h3>
    </div>
  );
};

const CheckoutPage = () => {
  const [cart] = useStateWithLocalStorage('cart', []);
  const [contactInfo, setContactInfo] = useStateWithLocalStorage(
    'contactInfo',
    {},
  );
  const [orderPlaced, setOrderPlaced] = useState(false);

  let headingText;
  if (!orderPlaced) {
    headingText =
      'Fill your information in below and we’ll call you within the hour to confirm your order.';
  }

  const placeOrder = async () => {
    await fetch(
      `https://us-central1-iphones-tt-176b7.cloudfunctions.net/sendMail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactInfo,
          order: cart,
        }),
      },
    );
    localStorage.removeItem('cart');
    setOrderPlaced(true);
  };

  return (
    <div className="CheckoutPage">
      <Heading title="Checkout" text={headingText} />
      {orderPlaced && (
        <div className="CheckoutPage-placed">
          <h3>Your order has been placed!</h3>
          <p>Wee&#39;ll call you within the hour to confirm your order.</p>
        </div>
      )}
      <div className="CheckoutPage-content">
        <OrderSummary cart={cart} />
        {!orderPlaced && (
          <>
            <ContactForm
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
            />
            <Button
              text="Place Order"
              onClick={placeOrder}
              disabled={cart.length === 0}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
