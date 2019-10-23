import React from 'react';
import { withKnobs, number, select, boolean } from '@storybook/addon-knobs';
import Price from './Price';

const DEFAULT_AMT = 2000;
const DEFAULT_REDUCTION = 500;
const CURRENCY_OPTIONS = ['TTD', 'USD'];

export default { title: 'Price' };

export const base = () => <Price amt={DEFAULT_AMT} />;

export const withoutCommas = () => <Price amt={DEFAULT_AMT} commas={false} />;

export const withCustomCurrency = () =>
  <Price amt={DEFAULT_AMT} currency="USD" />;

export const withReduction = () =>
  <Price amt={DEFAULT_AMT} reduction={DEFAULT_REDUCTION} />;

export const playground = () => {
  const amt = number('Amount', DEFAULT_AMT);
  const reduction = number('Reduction', DEFAULT_REDUCTION);
  const commas = boolean('Commas', true);
  const currency = select('Currency', CURRENCY_OPTIONS, CURRENCY_OPTIONS[0]);
  return (
    <Price
      amt={amt}
      reduction={reduction}
      commas={commas}
      currency={currency}
    />
  );
};
playground.story = {
  decorators: [withKnobs],
};
