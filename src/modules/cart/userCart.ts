import { useState, useContext, useEffect } from 'react';

import { useAuth } from '../auth';
import { FirebaseContext } from '../firebase';
import { CartItem } from './types';

export function useUserCart() {
  const { user } = useAuth();
  const { db } = useContext(FirebaseContext);

  const [userCart, setUserCart] = useState<CartItem[]>([]);
  const [userCartLoading, setUserCartLoading] = useState(true);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user) {
      setUserCartLoading(true);
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot(querySnapshot => {
          setUserCart(querySnapshot.get('cart') || []);
          setUserCartLoading(false);
        });
      return () => unsubscribe();
    }
  }, [db, user]);

  async function addItemToCart(item: CartItem) {
    if (user) {
      const match = userCart.find(ci => ci.id === item.id);
      let newCart: CartItem[];
      if (match) {
        newCart = [...userCart, { ...match, quantity: match.quantity + 1 }];
      } else {
        newCart = [...userCart, item];
      }

      await db
        .collection('users')
        .doc(user.uid)
        .set({ cart: newCart }, { merge: true });
      setAdded(true);
    }
  }

  async function removeItemFromCart(itemId: string) {
    if (user) {
      const newCart = userCart.filter(ci => ci.id !== itemId);
      await db
        .collection('users')
        .doc(user.uid)
        .set({ cart: newCart }, { merge: true });
    }
  }

  async function updateItemQuantity(itemId: string, quantity: number) {
    if (user) {
      const newCart = [...userCart];
      newCart.forEach((ci, index, cart) => {
        if (ci.id === itemId) {
          cart[index] = { ...ci, quantity };
        }
      });

      await db
        .collection('users')
        .doc(user.uid)
        .set({ cart: newCart }, { merge: true });
    }
  }

  return {
    cart: userCart,
    addItemToCart,
    added,
    userCartLoading,
    removeItemFromCart,
    updateItemQuantity,
  };
}
