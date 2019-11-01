import { fireEvent } from '@testing-library/react';

export const typeText = (el: HTMLElement, value: string) => {
  fireEvent.change(el, { target: { value } });
};
