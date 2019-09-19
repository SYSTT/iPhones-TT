import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

import Heading from '../Heading/Heading';
import Rocker from '../Rocker/Rocker';
import Button from '../Button/Button';

import { price } from './../../utils/templateLiteralTags';
import { useStateWithLocalStorage } from './../../utils/hooks';

function OrderItem({ item, quantity, id, updateQuantity, newOrUsed }) {
    return (
        <div className="OrderItem">
            <div className="OrderItem-details">
                <h3 className="OrderItem-name">{ item.model }</h3>
                <p>{ newOrUsed }</p>
                <p className="OrderItem-name">{ item.memory }GB</p>
            </div>
            <Rocker
                title="Quantity"
                name={`${id}-quantity`}
                value={quantity}
                onChange={updateQuantity}
                min={0}
                max={100}
            />
            <p className="OrderItem-price">
                { price`${item.price}` } x { quantity } =&nbsp;
                { price`${item.price * quantity}` }
            </p>
        </div>
    );
}

function CartList({ cart, updateCart }) {
    const orderItems = cart.map(orderItem => (
        <OrderItem
            key={`${orderItem.item.model}-${orderItem.item.memory}-${orderItem.newOrUsed}`}
            {...orderItem}
            updateQuantity={
                quantity => updateCart(orderItem.item.model, orderItem.item.memory, quantity)
            }
        />
    ));
    return (
        <div className="CartList">
            { orderItems }
        </div>
    );
}

function CartPage() {
    const [cart, setCart] = useStateWithLocalStorage('cart', []);

    const grandTotal = cart.reduce(
        (acc, cur) => acc + cur.item.price * cur.quantity
    , 0);

    const updateCart = (model, memory, newQuantity) => {
        let newCart = [];
        for (const orderItem of cart) {
            if (orderItem.item.model === model &&
                orderItem.item.memory === memory) {
                newCart.push({ ...orderItem, quantity: newQuantity });
            } else {
                newCart.push(orderItem);
            }
        }
        setCart(newCart);
    }

    return (
        <div className="CartPage">
            <Heading title="Your Cart" text="View the items in your cart and checkout out below." />
            <div className="CartPage-content">
                <div className="CartPage-cart">
                    { cart.length === 0 &&
                    <h3 className="CartPage-empty">Your cart is empty!</h3>
                    }
                    <CartList cart={cart} updateCart={updateCart} />
                </div>
                <div className="CartPage-checkout">
                    <h3 className="CartPage-total">Total: { price`${grandTotal}` } TTD</h3>
                    { cart.length
                    ?   <Link to="/checkout"><Button text="Checkout" /></Link>
                    :   <Button text="Checkout" disabled={true} />
                    }
                </div>
            </div>
        </div>
    );
}

export default CartPage;
