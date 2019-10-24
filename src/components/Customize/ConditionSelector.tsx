import React from 'react';
import { Icon } from 'antd';

import { AGRADE, NEW, Condition, Configuration } from '../../modules/stock';

import Price from '../Price';
import { OptionList, OptionButton } from '../../utils';
import { SelectorContainer } from './elements';

type Props = {
  condition?: string;
  setCondition: (condition: Condition) => void;
  configs: Configuration[];
};

function ConditionSelector({ condition, setCondition, configs }: Props) {
  const agradeConfigs = configs.filter(config => config.condition === AGRADE);
  const newConfigs = configs.filter(config => config.condition === NEW);
  return (
    <SelectorContainer>
      <h4>Condition</h4>
      <OptionList>
        <OptionButton
          selected={condition === AGRADE}
          type="ghost"
          onClick={() => setCondition(AGRADE)}
          disabled={agradeConfigs.length === 0}
        >
          <h2>
            <Icon type="safety-certificate" /> A-Grade
          </h2>
          {agradeConfigs.length ? (
            <span>
              From <Price amt={agradeConfigs[0].price} />
            </span>
          ) : (
            'Out of stock'
          )}
        </OptionButton>
        <OptionButton
          selected={condition === NEW}
          type="ghost"
          onClick={() => setCondition(NEW)}
          disabled={newConfigs.length === 0}
        >
          <h2>
            <Icon type="tag" /> New
          </h2>
          <span>
            {newConfigs.length ? (
              <span>
                From <Price amt={newConfigs[0].price} />
              </span>
            ) : (
              'Out of stock'
            )}
          </span>
        </OptionButton>
      </OptionList>
    </SelectorContainer>
  );
}

export default ConditionSelector;
