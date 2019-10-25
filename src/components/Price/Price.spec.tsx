import { render } from '@testing-library/react';

import { toPriceString } from './Price';
import { base, withReduction, withReductionBlock } from './Price.stories';
import { DEFAULT_AMT, DEFAULT_REDUCTION } from './constants';

describe('toPriceString', () => {
  it('converts a numeric price to a formatted string', () => {
    expect(toPriceString(1000000)).toBe('$1,000,000.00 TTD');
  });

  it('converts a numeric price to a formatted string without commas', () => {
    expect(toPriceString(1000000, { commas: false })).toBe('$1000000.00 TTD');
  });

  it('converts a numeric price with custom currency', () => {
    expect(toPriceString(1000000, { currency: 'USD' })).toBe(
      '$1,000,000.00 USD',
    );
  });
});

describe('Price', () => {
  it('renders without exploding', () => {
    const { getByText } = render(base());
    expect(getByText(toPriceString(DEFAULT_AMT))).toBeInTheDocument();
  });

  describe('With reduction', () => {
    it('displays reduced price', () => {
      const { getByText } = render(withReduction());
      expect(
        getByText(toPriceString(DEFAULT_AMT - DEFAULT_REDUCTION)),
      ).toBeInTheDocument();
    });

    it('displays price and reduced price vertically (as blocks)', () => {
      const { getByText } = render(withReductionBlock());
      expect(getByText(toPriceString(DEFAULT_AMT))).toHaveStyle(
        'display: block',
      );
      expect(
        getByText(toPriceString(DEFAULT_AMT - DEFAULT_REDUCTION)),
      ).toHaveStyle('display: block');
    });

    it('displays original price crossed off', () => {
      const { getByText } = render(withReduction());
      expect(getByText(toPriceString(DEFAULT_AMT))).toBeInTheDocument();
      expect(getByText(toPriceString(DEFAULT_AMT))).toHaveStyle(
        'text-decoration: line-through',
      );
    });
  });
});
