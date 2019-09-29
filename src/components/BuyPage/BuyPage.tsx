import React, { useState } from 'react';
import './BuyPage.css';

import Heading from '../Heading/Heading';
import Switch from '../Switch/Switch';
import ModelOption from './ModelOption/ModelOption';

import { withFirebase, Firebase } from '../Firebase';
import { useStock, Model, AGRADE, NEW } from './../../modules/stock';

type Props = {
  firebase: Firebase;
};

function BuyPage({ firebase }: Props) {
  const { stock } = useStock(firebase.db);

  const [newOrUsed, setNewOrUsed] = useState(AGRADE);

  const agradeModels: Model[] = [];
  const newModels: Model[] = [];
  for (const model of stock) {
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
