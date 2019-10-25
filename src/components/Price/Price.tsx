import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils';

const Reduction = styled.span`
  color: ${Colors.Green};
  margin-right: 4px;
`;

const BasePrice = styled.span<{ reduced?: boolean }>`
  position: relative;
  text-decoration: ${props => (props.reduced ? 'line-through' : 'initial')};
`;

interface ToPriceStringOptions {
  commas?: boolean;
  currency?: string;
}
export function toPriceString(
  price: number,
  { commas = true, currency = 'TTD' }: ToPriceStringOptions = {},
) {
  return `$${
    commas
      ? price.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g, '$1,')
      : price.toFixed(2)
  } ${currency}`;
}

type PriceProps = {
  amt: number;
  reduction?: number;
  commas?: boolean;
  currency?: string;
};

export default function Price({
  amt,
  reduction,
  commas = true,
  currency = 'TTD',
}: PriceProps) {
  return (
    <span>
      {!!reduction && (
        <Reduction>
          {toPriceString(amt - reduction, { commas, currency })}
        </Reduction>
      )}
      <BasePrice reduced={!!reduction}>
        {toPriceString(amt, { commas, currency })}
      </BasePrice>
    </span>
  );
}
