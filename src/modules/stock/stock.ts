import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';

export const AGRADE = 'A-Grade';
export const NEW = 'New';

export type Condition = typeof AGRADE | typeof NEW;

export type Configuration = {
  memory: number;
  price: number;
  condition: Condition;
  stock: number;
};

type ModelData = {
  model: string;
  configurations: Configuration[];
};

export type Model = ModelData & {
  id: string;
};

export const useStock = () => {
  const { db } = useContext(FirebaseContext);

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

  const updateModel = async (id: string, model: ModelData) => {
    await db.collection('stock').doc(id).update(model);
  };

  const addModel = async ({ model, configurations }: ModelData) => {
    await db.collection('stock').add({ model, configurations });
  };

  const deleteModel = async (id: string) => {
    await db.collection('stock').doc(id).delete();
  };

  return {
    stock,
    updateModel,
    addModel,
    deleteModel,
  };
};

