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

  async function addItemToCart(item: CartItem) {
    const match = userCart.find(ci => ci.id === item.id);
    let newCart = [];
    if (match) {
      newCart = [...userCart, { ...match, quantity: match.quantity + 1 }];
      setUserCart(newCart);
    } else {
      newCart = [...userCart, item];
      setUserCart(newCart);
    }
    if (user) {
      await db.collection('users').doc(user.uid).set(
        { cart: newCart },
        { merge: true }
      );
      setAdded(true);
    }
  }

  useEffect(() => {
    if (user) {
      setUserCartLoading(true);
      const unsubscribe = db.collection('users').doc(user.uid).onSnapshot(
        querySnapshot => {
          setUserCart(querySnapshot.get('cart') || []);
          setUserCartLoading(false);
        }
      );
      return () => unsubscribe();
    }
  }, [db, user]);

  return {
    cart: userCart,
    addItemToCart,
    added,
    userCartLoading,
  };
};
