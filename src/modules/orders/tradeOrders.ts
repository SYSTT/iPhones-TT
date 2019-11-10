import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { Configuration } from '../stock';
import { Profile } from '../../components/forms/ProfileInfoForm';
import { OrderStatus } from './types';

interface TradeOrderMetaData {
  creationTimestamp: Date;
  modifiedTimestamp: Date;
}

export interface TradeItem {
  model: string;
  slug: string;
  memory: number;
  color: string;
  issues: string;
  batteryHealth: number;
  rating: number;
  pictureUrls: string[];
}

export interface OrderItem extends Configuration {
  model: string;
  slug: string;
  quantity: number;
}

export interface TradeOrderData {
  status: OrderStatus;
  orderItem: OrderItem;
  tradeItem: TradeItem;
  profileInfo: Omit<Profile, 'password'>;
}

export interface TradeOrder extends TradeOrderData, TradeOrderMetaData {
  id: string;
}

export const useTradeOrders = () => {
  const { db } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [tradeOrders, setTradeOrders] = useState<TradeOrder[]>([]);
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
        setTradeOrders(tradeOrders);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [db]);

  async function addTradeOrders(newOrdersData: TradeOrderData[]) {
    const batch = db.batch();
    newOrdersData.forEach((newOrderData: TradeOrderData) => {
      const docRef = db.collection('trade-orders').doc(); //automatically generate unique id
      console.log(newOrderData);
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
    tradeOrders,
    loading,
    added,
    addTradeOrders,
    updateTradeOrderStatus,
  };
};
