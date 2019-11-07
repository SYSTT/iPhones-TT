import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { Configuration } from '../stock';
import { useAuth } from '../auth';

export type OrderStatus = 'pending' | 'approved' | 'scheduled' | 'completed';

interface TradeOrderMetaData {
  creationTimestamp: Date;
  modifiedTimestamp: Date;
}

export interface TradeOrderData extends Configuration {
  id: string;
  status: OrderStatus;
  orderItem: Configuration & {
    model: string;
    slug: string;
    quantity: number;
  };
  tradeItem: {
    model: string;
    slug: string;
    memory: string;
    colour: string;
    issues: string;
    batteryHealth: number;
    rating: number;
    pictureUrls: string[];
  };
}

export interface TradeOrder extends TradeOrderData, TradeOrderMetaData {}

export const useTradeOrders = () => {
  const { user } = useAuth();
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<TradeOrder[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot(querySnapshot => {
          setOrders(querySnapshot.get('trade-orders') || []);
          setLoading(false);
        });
      return () => unsubscribe();
    }
  }, [db, user]);

  async function addTradeOrders(newOrdersData: TradeOrderData[]) {
    if (user) {
      const newOrders: TradeOrder[] = newOrdersData.map(od => ({
        ...od,
        creationTimestamp: new Date(),
        modifiedTimestamp: new Date(),
      }));

      await db
        .collection('users')
        .doc(user.uid)
        .set({ orders: [...orders, ...newOrders] }, { merge: true });
      setAdded(true);
    }
  }

  async function updateTradeOrderStatus(orderId: string, status: OrderStatus) {
    if (user) {
      const newOrders = [...orders];
      newOrders.forEach((order, index, orders) => {
        if (order.id === orderId) {
          orders[index] = { ...order, status, modifiedTimestamp: new Date() };
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
    addTradeOrders,
    updateTradeOrderStatus,
  };
};
