import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { Configuration } from '../stock';
import { useAuth } from '../auth';

export type OrderStatus = 'pending' | 'approved' | 'scheduled' | 'completed';

export interface Order extends Configuration {
  id: string;
  status: OrderStatus;
  model: string;
  slug: string;
  quantity: number;
}

export const useOrders = () => {
  const { user } = useAuth();
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot(querySnapshot => {
          setOrders(querySnapshot.get('orders') || []);
          setLoading(false);
        });
      return () => unsubscribe();
    }
  }, [db, user]);

  async function addOrders(newOrders: Order[]) {
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .set({ orders: [...orders, ...newOrders] }, { merge: true });
      setAdded(true);
    }
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    if (user) {
      const newOrders = [...orders];
      newOrders.forEach((order, index, orders) => {
        if (order.id === orderId) {
          orders[index] = { ...order, status };
        }
      });

      await db
        .collection('users')
        .doc(user.uid)
        .set({ orders: newOrders }, { merge: true });
    }
  }

  return {
    orders,
    loading,
    added,
    addOrders,
    updateOrderStatus,
  };
};
