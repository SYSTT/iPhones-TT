import React from 'react';

import { Configuration } from '../../modules/stock';

import { Colors, dedup, OptionList, OptionButton } from '../../utils';
import { SelectorContainer } from './elements';

type Props = {
  color?: string;
  setColor: (color: string) => void;
  configs: Configuration[],
  disabled?: boolean,
};

function ColorSelector({
  color,
  setColor,
  configs,
  disabled,
}: Props) {
  const renderOption = (optionColor: string) => {
    const outOfStock = !configs.find(
      ({ color, stock }) => color === optionColor && stock > 0
    );
    return (
      <OptionButton
        key={optionColor}
        selected={color === optionColor}
        type="ghost"
        onClick={() => setColor(optionColor)}
        disabled={outOfStock || disabled}
      >
        <h2>
          {optionColor}
        </h2>
        {outOfStock && 'Out of stock'}
      </OptionButton>
    );
  }

  return (
    <SelectorContainer>
      <h4 style={{ color: disabled ? Colors.Grey : 'initial'}}>Color</h4>
      <OptionList>
        {dedup(configs.map(config => config.color)).map(
          color => renderOption(color)
        )}
      </OptionList>
    </SelectorContainer>
  );
}

export default ColorSelector;
