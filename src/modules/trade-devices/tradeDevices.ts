import { useState, useEffect, useContext, useCallback } from 'react';

import { FirebaseContext } from '../firebase';
import { toSlug } from '../../utils';

export type DeviceOption = {
  memory: number;
  price: number;
};

export type DeviceData = {
  model: string;
  options: DeviceOption[];
};

export type DeviceMetaData = {
  id: string;
  slug: string;
};

export type Device = DeviceData & DeviceMetaData;

export function useTradeDevices() {
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(true);
  const [tradeDevices, setTradeDevices] = useState<Device[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection('trade-devices')
      .onSnapshot(querySnapshot => {
        const tradeDevices: Device[] = [];
        querySnapshot.forEach(doc => {
          const model = doc.data() as DeviceData;
          tradeDevices.push({
            ...model,
            id: doc.id,
            slug: toSlug(model.model),
          });
        });
        setTradeDevices(tradeDevices);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [db]);

  async function updateTradeDevice(id: string, model: DeviceData) {
    await db
      .collection('trade-devices')
      .doc(id)
      .update(model);
  }

  async function addTradeDevice({ model, options }: DeviceData) {
    await db.collection('trade-devices').add({ model, options });
  }

  async function deleteTradeDevice(id: string) {
    await db
      .collection('trade-devices')
      .doc(id)
      .delete();
  }

  const getTradeDeviceBySlug = useCallback(
    (slug: string) => {
      return tradeDevices.find(td => td.slug === slug);
    },
    [tradeDevices],
  );

  return {
    loading,
    tradeDevices,
    updateTradeDevice,
    addTradeDevice,
    deleteTradeDevice,
    getTradeDeviceBySlug,
  };
}
