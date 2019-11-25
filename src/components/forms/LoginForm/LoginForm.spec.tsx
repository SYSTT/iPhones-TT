import { render, fireEvent } from '@testing-library/react';

import { base } from './LoginForm.stories';
import { typeText } from '../../../utils/test/events';
import {
  EXAMPLE_LOGIN_INFO,
  DEFAULT_SUBMIT_TEXT,
  EMPTY_LOGIN_INFO,
} from './constants';

describe('LoginForm', () => {
  it('Renders all fields with placeholders', () => {
    const { getByPlaceholderText } = render(base());

    expect(getByPlaceholderText(/email/)).toBeInTheDocument();
    expect(getByPlaceholderText(/password/)).toBeInTheDocument();
  });

  it.skip('Accepts input from each field and submits', () => {
    const onSubmit = jest.fn();
    const {
      email: { value: email },
      password: { value: password },
    } = EXAMPLE_LOGIN_INFO;
    const { getByPlaceholderText, getByText } = render(base(onSubmit));

    typeText(getByPlaceholderText(/email/), email);
    typeText(getByPlaceholderText(/password/), password);

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it('Displays error on submit click for missing field and does not submit', () => {
    const onSubmit = jest.fn();
    const { getByText, getAllByTestId } = render(base(onSubmit));

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    const errorIcons = getAllByTestId('ErrorIcon');
    expect(errorIcons).toHaveLength(Object.keys(EMPTY_LOGIN_INFO).length);
    // errorIcons.forEach(errorIcon => {
    //   fireEvent.mouseOver(errorIcon, { bubbles: true });
    //   expect(getByText('This field is required')).toBeInTheDocument();
    //   fireEvent.mouseLeave(errorIcon);
    // });
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('Displays error on submit click for invalid email and does not submit', () => {
    const onSubmit = jest.fn();
    const {
      password: { value: password },
    } = EXAMPLE_LOGIN_INFO;
    const { getAllByTestId, getByPlaceholderText, getByText } = render(
      base(onSubmit),
    );

    typeText(getByPlaceholderText(/email/), 'thisIsNotAValidEmail');
    typeText(getByPlaceholderText(/password/), password);

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    const errorIcons = getAllByTestId('ErrorIcon');
    expect(errorIcons).toHaveLength(1);
    // fireEvent.mouseOver(errorIcons[0]);
    // expect(getByText('Email address is invalid')).toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
