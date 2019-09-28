import React, { useState, useEffect } from 'react';
import './BuyPage.css';

import Heading from '../Heading/Heading';
import Switch from '../Switch/Switch';
import ModelOption from './ModelOption/ModelOption';

import { withFirebase, Firebase } from '../Firebase';

const AGRADE = 'A-Grade';
const NEW = 'New';

type Props = {
  firebase: Firebase;
};

type Configuration = {
  memory: number;
  price: number;
  condition: typeof AGRADE | typeof NEW;
};

type Model = {
  model: string;
  configurations: Configuration[];
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

  const [newOrUsed, setNewOrUsed] = useState(AGRADE);

  const agradeModels: Model[] = [];
  const newModels: Model[] = [];
  for (const model of models) {
    const agradeConfigurations = [];
    const newConfigurations = [];
    for (const configuration of model.configurations) {
      if (configuration.condition === 'A-Grade') {
        agradeConfigurations.push(configuration);
      } else {
        newConfigurations.push(configuration);
      }
    }
    if (agradeConfigurations.length) {
      agradeModels.push({ ...model, configurations: agradeConfigurations });
    }
    if (newConfigurations.length) {
      newModels.push({ ...model, configurations: newConfigurations });
    }
  }

  const Agrade = agradeModels.map(item =>
    <ModelOption
      key={`${item.model}-${AGRADE}`}
      model={item.model}
      newOrUsed={AGRADE}
      memoryOptions={item.configurations}
    />
  );

  const New = newModels.map(item =>
    <ModelOption
      key={`${item.model}-${NEW}`}
      model={item.model}
      newOrUsed={NEW}
      memoryOptions={item.configurations}
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
          {newOrUsed === AGRADE ? Agrade : New}
        </div>
      </div>
    </div>
  );
}

export default withFirebase(BuyPage);
