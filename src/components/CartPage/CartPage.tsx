import React from 'react';

import { Container } from './elements';
import { Heading } from '../../utils';
import { useCart } from '../../modules/cart';

function CartPage() {
  const { cart } = useCart();
  return (
    <Container>
      <Heading>Here's what's in your cart.</Heading>
      {cart.map(cartItem => cartItem.id)}
    </Container>
  );
}

export default CartPage;
