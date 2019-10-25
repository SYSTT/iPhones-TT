import React from 'react';

import { Configuration } from '../../modules/stock';

import Price from '../Price';
import { OptionList, OptionButton, Colors, dedup } from '../../utils';
import { SelectorContainer } from './elements';

type Props = {
  memory?: number;
  setMemory: (memory: number) => void;
  configs: Configuration[];
  disabled?: boolean;
  tradeAmt?: number;
};

const MemorySelector: React.FC<Props> = ({
  memory,
  setMemory,
  configs,
  disabled,
  tradeAmt = 0,
}) => {
  const renderOption = (optionMemory: number, optionPrice: number) => {
    const outOfStock = !configs.find(
      ({ memory, stock }) => memory === optionMemory && stock > 0,
    );
    return (
      <OptionButton
        key={optionMemory}
        selected={memory === optionMemory}
        type="ghost"
        onClick={() => setMemory(optionMemory)}
        disabled={outOfStock || disabled}
      >
        <h2>
          {optionMemory}
          <span style={{ fontSize: 14 }}>GB</span>
        </h2>
        {outOfStock ? (
          'Out of stock'
        ) : (
          <Price amt={optionPrice} reduction={tradeAmt} />
        )}
      </OptionButton>
    );
  };

  return (
    <SelectorContainer>
      <h4 style={{ color: disabled ? Colors.Grey : 'initial' }}>Memory</h4>
      <OptionList>
        {dedup(configs, config => config.memory).map(config =>
          renderOption(config.memory, config.price),
        )}
      </OptionList>
    </SelectorContainer>
  );
};

export default MemorySelector;
