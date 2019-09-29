import { useState, useEffect } from 'react';
import { firestore } from 'firebase';

export const AGRADE = 'A-Grade';
export const NEW = 'New';

type Configuration = {
  memory: number;
  price: number;
  condition: typeof AGRADE | typeof NEW;
};

type ModelData = {
  model: string;
  configurations: Configuration[];
};

export type Model = ModelData & {
  id: string;
};

export const useStock = (db: firestore.Firestore) => {
  const [stock, setStock] = useState<Model[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection('stock').onSnapshot(querySnapshot => {
      const models: Model[] = [];
      querySnapshot.forEach(doc => {
        models.push({ ...doc.data() as ModelData, id: doc.id });
      });
      setStock(models);
    });
    return () => unsubscribe();
  }, [db]);

  const updateModelStock = async (id: string, model: ModelData) => {
    await db.collection('stock').doc(id).update(model);
  };

  return { stock, updateModelStock };
};

