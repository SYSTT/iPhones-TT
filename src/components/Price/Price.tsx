import React from 'react';

import { Reduction, BasePrice, Container } from './elements';

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
  block?: boolean;
  abs?: boolean;
};

export default function Price({
  amt,
  reduction,
  commas = true,
  currency = 'TTD',
  block = false,
  abs = false,
}: PriceProps) {
  return (
    <Container block={block}>
      {!!reduction && (
        <Reduction>
          {toPriceString(abs ? Math.abs(amt - reduction) : amt - reduction, {
            commas,
            currency,
          })}
        </Reduction>
      )}
      <BasePrice reduced={!!reduction}>
        {toPriceString(abs ? Math.abs(amt) : amt, { commas, currency })}
      </BasePrice>
    </Container>
  );
}
