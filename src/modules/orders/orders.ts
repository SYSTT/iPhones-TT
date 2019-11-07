import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { Configuration } from '../stock';
import { Profile } from '../../components/forms/ProfileInfoForm';

export type OrderStatus = 'pending' | 'approved' | 'scheduled' | 'completed';

interface OrderMetaData {
  creationTimestamp: Date;
  modifiedTimestamp: Date;
}

export interface OrderData {
  status: OrderStatus;
  orderItem: Configuration & {
    model: string;
    slug: string;
    quantity: number;
  };
  profileInfo: Omit<Profile, 'password'>;
}

export interface Order extends OrderData, OrderMetaData {
  id: string;
}

export const useOrders = () => {
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection('trade-orders')
      .onSnapshot(querySnapshot => {
        const order: Order[] = [];
        querySnapshot.forEach(doc => {
          const tradeOrder = doc.data() as Order;
          order.push({
            ...tradeOrder,
            id: doc.id,
          });
        });
        setOrders(order);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [db]);

  async function addOrders(newOrdersData: OrderData[]) {
    const batch = db.batch();
    newOrdersData.forEach((newOrderData: OrderData) => {
      const docRef = db.collection('orders').doc(); //automatically generate unique id
      batch.set(docRef, {
        ...newOrderData,
        creationTimestamp: new Date(),
        modifiedTimestamp: new Date(),
      });
    });
    await batch.commit();
    setAdded(true);
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    await db
      .collection('users')
      .doc(orderId)
      .update({ status, lastModified: new Date() });
  }

  return {
    orders,
    loading,
    added,
    addOrders,
    updateOrderStatus,
  };
};
