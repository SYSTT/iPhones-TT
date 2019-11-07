import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { Configuration } from '../stock';
import { Profile } from '../../components/forms/ProfileInfoForm';

export type OrderStatus = 'pending' | 'approved' | 'scheduled' | 'completed';

interface TradeOrderMetaData {
  creationTimestamp: Date;
  modifiedTimestamp: Date;
}

export interface TradeOrderData extends Configuration {
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
  profileInfo: Omit<Profile, 'password'>;
}

export interface TradeOrder extends TradeOrderData, TradeOrderMetaData {
  id: string;
}

export const useTradeOrders = () => {
  const { db } = useContext(FirebaseContext);
  const batch = db.batch();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<TradeOrder[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection('trade-orders')
      .onSnapshot(querySnapshot => {
        const tradeOrders: TradeOrder[] = [];
        querySnapshot.forEach(doc => {
          const tradeOrder = doc.data() as TradeOrder;
          tradeOrders.push({
            ...tradeOrder,
            id: doc.id,
          });
        });
        setOrders(tradeOrders);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [db]);

  async function addTradeOrders(newOrdersData: TradeOrderData[]) {
    newOrdersData.forEach((newOrderData: TradeOrderData) => {
      const docRef = db.collection('trade-orders').doc(); //automatically generate unique id
      batch.set(docRef, {
        ...newOrderData,
        creationTimestamp: new Date(),
        modifiedTimestamp: new Date(),
      });
    });
    await batch.commit();
    setAdded(true);
  }

  async function updateTradeOrderStatus(orderId: string, status: OrderStatus) {
    await db
      .collection('users')
      .doc(orderId)
      .update({ status, lastModified: new Date() });
  }

  return {
    orders,
    loading,
    added,
    addTradeOrders,
    updateTradeOrderStatus,
  };
};
