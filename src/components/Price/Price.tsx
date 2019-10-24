import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../utils';

const Reduction = styled.span`
  color: ${Colors.Green};
  margin-right: 4px;
`;

const BasePrice = styled.span<{ reduced?: boolean }>`
  position: relative;

  ${props =>
    props.reduced &&
    css`
    &:before {
      position: absolute;
      content: '';
      left: 0;
      top: 45%;
      right: 0;
      border-top: 2px solid;
      border-color: inherit;
      -webkit-transform: skewY(-10deg);
      -moz-transform: skewY(-10deg);
      transform: skewY(-10deg);
  `}
  }
`;

export function toPriceString(price: number, commas = true, currency = 'TTD') {
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
          {toPriceString(amt - reduction, commas, currency)}
        </Reduction>
      )}
      <BasePrice reduced={!!reduction}>
        {toPriceString(amt, commas, currency)}
      </BasePrice>
    </span>
  );
}
