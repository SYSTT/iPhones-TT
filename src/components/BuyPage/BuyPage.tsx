import React, { useState, useEffect } from 'react';
import './BuyPage.css';

import Heading from '../Heading/Heading';
import Switch from '../Switch/Switch';
import ModelOption from './ModelOption/ModelOption';

import { withFirebase, Firebase } from '../Firebase';

type Props = {
  firebase: Firebase;
};

type MemoryOption = {
  memory: number;
  price: number;
};

type Model = {
  model: string;
  agrade?: MemoryOption[];
  new?: MemoryOption[];
};

function BuyPage({ firebase }: Props) {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const unsubscribe = firebase.db.collection('stock').onSnapshot(querySnapshot => {
      const models: Model[] = [];
      querySnapshot.forEach(doc => {
        models.push(doc.data() as Model);
      });
      setModels(models);
    });
    return () => unsubscribe();
  }, [firebase.db]);

  const AGRADE = 'A-Grade';
  const NEW = 'New';
  const [newOrUsed, setNewOrUsed] = useState(AGRADE);

  const AGrade = models.filter(model => model.agrade).map(item =>
    <ModelOption
      key={`${item.model}-A-Grade`}
      model={item.model}
      newOrUsed="A-Grade"
      memoryOptions={item.agrade}
    />
  );

  const New = models.filter(model => model.new).map(item =>
    <ModelOption
      key={`${item.model}-New`}
      model={item.model}
      newOrUsed="New"
      memoryOptions={item.new}
    />
  );

  return (
    <div className="BuyPage">
      <Heading
        title="Buy Your iPhone Here"
        text="View our available iPhones and prices below. Select a model to purchase."
      />
      <div className="BuyPage-content">
        <Switch
          option1={AGRADE}
          option2={NEW}
          selected={newOrUsed}
          onSwitch={(option: string) => setNewOrUsed(option)}
        />
        <div className="BuyPage-options">
          {newOrUsed === AGRADE ? AGrade : New}
        </div>
      </div>
    </div>
  );
}

export default withFirebase(BuyPage);
