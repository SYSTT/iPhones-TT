import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../firebase';
import { toSlug } from '../../utils';

export const AGRADE = 'A-Grade';
export const NEW = 'New';

export type Condition = typeof AGRADE | typeof NEW;

export type Color = string;

export type Configuration = {
  memory: number;
  price: number;
  condition: Condition;
  color: Color;
  stock: number;
};

type ModelData = {
  model: string;
  configurations: Configuration[];
};

export type Model = ModelData & {
  id: string;
  slug: string;
};

export function useStock() {
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState<Model[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db.collection('stock').onSnapshot(querySnapshot => {
      const models: Model[] = [];
      querySnapshot.forEach(doc => {
        const model = doc.data() as ModelData;
        models.push({ ...model, id: doc.id, slug: toSlug(model.model) });
      });
      setStock(models);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [db]);

  async function updateModel(id: string, model: ModelData) {
    await db.collection('stock').doc(id).update(model);
  };

  async function addModel({ model, configurations }: ModelData) {
    await db.collection('stock').add({ model, configurations });
  };

  async function deleteModel(id: string) {
    await db.collection('stock').doc(id).delete();
  };

  function getModelBySlug(slug: string) {
    return stock.find(si => si.slug === slug);
  }

  return {
    loading,
    stock,
    updateModel,
    addModel,
    deleteModel,
    getModelBySlug,
  };
};

