import React from 'react';
import { Icon } from 'antd';

import { AGRADE, NEW, Condition, Configuration } from '../../modules/stock';

import Price from '../Price';
import { OptionList, OptionButton } from '../../utils';
import { SelectorContainer } from './elements';
import getCashDifference from '../../utils/getCashDifference';

type Props = {
  condition?: string;
  setCondition: (condition: Condition) => void;
  configs: Configuration[];
  tradeAmt?: number;
};

const ConditionSelector: React.FC<Props> = ({
  condition,
  setCondition,
  configs,
  tradeAmt,
}) => {
  const agradeConfigs = configs.filter(config => config.condition === AGRADE);
  const newConfigs = configs.filter(config => config.condition === NEW);

  const renderTradePrice = (
    orderItemPrice: number,
    orderItemCost: number,
    tradeItemPrice: number,
  ) => {
    const cashDifference = getCashDifference(orderItemCost, tradeItemPrice);
    return (
      <div style={{ display: 'inline-flex' }}>
        <div style={{ marginRight: '0.5em' }}>
          You <strong>{cashDifference > 0 ? 'pay' : 'get'}</strong>
        </div>
        <Price
          amt={orderItemPrice}
          reduction={orderItemPrice - cashDifference}
          block
          abs
        />
      </div>
    );
  };

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
              Starting from:{' '}
              {tradeAmt ? (
                renderTradePrice(
                  agradeConfigs[0].price,
                  agradeConfigs[0].cost,
                  tradeAmt,
                )
              ) : (
                <Price amt={agradeConfigs[0].price} />
              )}
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
                Starting from:{' '}
                {tradeAmt ? (
                  renderTradePrice(
                    newConfigs[0].price,
                    newConfigs[0].cost,
                    tradeAmt,
                  )
                ) : (
                  <Price amt={newConfigs[0].price} />
                )}
              </span>
            ) : (
              'Out of stock'
            )}
          </span>
        </OptionButton>
      </OptionList>
    </SelectorContainer>
  );
};

export default ConditionSelector;
