import React from 'react';
import { Link } from 'react-router-dom';
import { Select, Button, Divider } from 'antd';

import { useCart } from '../../modules/cart';

import Price from '../../components/Price';
import { Heading, RoundedButton } from '../../utils';
import {
  Container,
  ItemContainer,
  ItemContent,
  ItemDetails,
  ItemPrice,
  CartDetails,
} from './elements';

import iPhoneIMG from '../HomePage/cover.jpg';

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CartPage: React.FC = () => {
  const { cart, removeItemFromCart, updateItemQuantity } = useCart();

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Container>
      <Heading>Here&#39;s what&#39;s in your cart.</Heading>
      {cart.map(item => (
        <ItemContainer key={item.id}>
          <img src={iPhoneIMG} alt={item.model} />
          <ItemContent>
            <ItemDetails>
              <h2>
                <Link to={`/buy/${item.slug}`}>
                  {item.model} {item.memory}GB {item.color}
                </Link>
              </h2>
              <div>
                <Select
                  defaultValue={item.quantity}
                  onChange={(quantity: number) =>
                    updateItemQuantity(item.id, quantity)
                  }
                >
                  {QUANTITY_OPTIONS.map(quantityOpt => (
                    <Select.Option key={quantityOpt} value={quantityOpt}>
                      <h2>{quantityOpt}</h2>
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <ItemPrice>
                <h2>
                  <Price amt={item.price * item.quantity} />
                </h2>
                <Button type="link" onClick={() => removeItemFromCart(item.id)}>
                  Remove
                </Button>
              </ItemPrice>
            </ItemDetails>
          </ItemContent>
        </ItemContainer>
      ))}
      <Divider />
      <CartDetails>
        <div>
          <h2>Your total:</h2>
          <h2>
            <Price amt={total} />
          </h2>
        </div>
        <RoundedButton type="primary">Checkout</RoundedButton>
      </CartDetails>
    </Container>
  );
};

export default CartPage;
