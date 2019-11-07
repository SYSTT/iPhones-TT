import { render, fireEvent } from '@testing-library/react';

import { base } from './ProfileInfoForm.stories';
import { typeText } from '../../../utils/test/events';
import {
  EXAMPLE_PROFILE_INFO,
  DEFAULT_SUBMIT_TEXT,
  EMPTY_PROFILE_INFO,
} from './constants';

describe('ProfileInfoForm', () => {
  it('Renders all fields with placeholders', () => {
    const { getByPlaceholderText } = render(base());

    expect(getByPlaceholderText(/email/)).toBeInTheDocument();
    expect(getByPlaceholderText(/first name/)).toBeInTheDocument();
    expect(getByPlaceholderText(/last name/)).toBeInTheDocument();
    expect(getByPlaceholderText(/phone number/)).toBeInTheDocument();
    expect(getByPlaceholderText(/password/)).toBeInTheDocument();
  });

  it('Accepts input from each field and submits', () => {
    const onSubmit = jest.fn();
    const {
      email: { value: email },
      firstName: { value: firstName },
      lastName: { value: lastName },
      phoneNumber: { value: phoneNumber },
      password: { value: password },
    } = EXAMPLE_PROFILE_INFO;
    const { getByPlaceholderText, getByText } = render(base(onSubmit));

    typeText(getByPlaceholderText(/email/), email);
    typeText(getByPlaceholderText(/first name/), firstName);
    typeText(getByPlaceholderText(/last name/), lastName);
    typeText(getByPlaceholderText(/phone number/), phoneNumber);
    typeText(getByPlaceholderText(/password/), password);

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    });
  });

  it('Displays error on submit click for missing field and does not submit', () => {
    const onSubmit = jest.fn();
    const { getByText, getAllByTestId } = render(base(onSubmit));

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    const errorIcons = getAllByTestId('ErrorIcon');
    expect(errorIcons).toHaveLength(Object.keys(EMPTY_PROFILE_INFO).length - 1);
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
      firstName: { value: firstName },
      lastName: { value: lastName },
      phoneNumber: { value: phoneNumber },
      password: { value: password },
    } = EXAMPLE_PROFILE_INFO;
    const { getAllByTestId, getByPlaceholderText, getByText } = render(
      base(onSubmit),
    );

    typeText(getByPlaceholderText(/email/), 'thisIsNotAValidEmail');
    typeText(getByPlaceholderText(/first name/), firstName);
    typeText(getByPlaceholderText(/last name/), lastName);
    typeText(getByPlaceholderText(/phone number/), phoneNumber);
    typeText(getByPlaceholderText(/password/), password);

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    const errorIcons = getAllByTestId('ErrorIcon');
    expect(errorIcons).toHaveLength(1);
    // fireEvent.mouseOver(errorIcons[0]);
    // expect(getByText('Email address is invalid')).toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
