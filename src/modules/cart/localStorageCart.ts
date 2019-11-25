import { useState } from 'react';

import { useStateWithLocalStorage } from '../../utils';
import { CartItem } from './types';

export function useLocalStorageCart() {
  const [localStorageCart, setLocalStorageCart] = useStateWithLocalStorage<
    CartItem[]
  >('cart', []);

  const [added, setAdded] = useState(false);

  async function addItemToCart(item: CartItem) {
    const match = localStorageCart.find(ci => ci.id === item.id);
    if (match) {
      setLocalStorageCart(prevCart => [
        ...prevCart,
        { ...match, quantity: match.quantity + 1 },
      ]);
    } else {
      setLocalStorageCart(prevCart => [...prevCart, item]);
    }
    setAdded(true);
  }

  async function removeItemFromCart(itemId: string) {
    setLocalStorageCart(localStorageCart.filter(ci => ci.id !== itemId));
  }

  async function updateItemQuantity(itemId: string, quantity: number) {
    const newCart = [...localStorageCart];
    newCart.forEach((ci, index, cart) => {
      if (ci.id === itemId) {
        cart[index] = { ...ci, quantity };
      }
    });
    setLocalStorageCart(newCart);
  }

  async function clearCart() {
    setLocalStorageCart([]);
  }

  return {
    cart: localStorageCart,
    addItemToCart,
    added,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
  };
}
