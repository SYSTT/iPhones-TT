import React, { useState } from 'react';
import './CartPage.css';
import Heading from '../Heading/Heading';
import Rocker from '../Rocker/Rocker';

import { price } from './../../utils/templateLiteralTags';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    );
    React.useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);
    return [value, setValue];
};

function OrderItem({ item, quantity, id, updateQuantity }) {
    return (
        <div className="OrderItem">
            <div className="OrderItem-details">
                <h3 className="OrderItem-name">{ item.model }</h3>
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
            key={orderItem.id}
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

function CartPage({}) {
    const [cart, setCart] = useStateWithLocalStorage('cart');

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
                { cart.length === 0 &&
                <h3 className="CartPage-empty">Your cart is empty!</h3>
                }
                <CartList cart={cart} updateCart={updateCart} />
                <h3 className="CartPage-total">Total: { price`${grandTotal}` } TTD</h3>
            </div>
        </div>
    );
}

export default CartPage;
