import React from 'react';

import { Configuration } from '../../modules/stock';
import { Colors, dedup } from '../../utils';

import { OptionList, OptionButton } from './elements';

type Props = {
  memory?: number;
  setMemory: (memory: number) => void;
  configs: Configuration[],
  disabled?: boolean,
};

function MemorySelector({
  memory,
  setMemory,
  configs,
  disabled,
}: Props) {
  const renderOption = (optionMemory: number) => {
    const outOfStock = !configs.find(
      ({ memory, stock }) => memory === optionMemory && stock > 0
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
        </h2>
        {outOfStock && 'Out of stock'}
      </OptionButton>
    );
  }

  return (
    <>
      <h4 style={{ color: disabled ? Colors.Grey : 'initial'}}>Memory</h4>
      <OptionList>
        {dedup(configs.map(config => config.memory)).map(
          memory => renderOption(memory)
        )}
      </OptionList>
    </>
  );
}

export default MemorySelector;
