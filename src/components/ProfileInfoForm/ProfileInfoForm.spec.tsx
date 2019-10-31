import { render, fireEvent, getByText } from '@testing-library/react';

import { base, baseOnSubmit } from './ProfileInfoForm.stories';
import { typeText } from '../../utils/test/events';
import { EXAMPLE_PROFILE_INFO, DEFAULT_SUBMIT_TEXT } from './constants';

describe('ProfileInfoForm', () => {
  it('Renders all fields with placeholders', () => {
    const { getByPlaceholderText } = render(base());

    expect(getByPlaceholderText(/email/)).toBeInTheDocument();
    expect(getByPlaceholderText(/first name/)).toBeInTheDocument();
    expect(getByPlaceholderText(/last name/)).toBeInTheDocument();
    expect(getByPlaceholderText(/password/)).toBeInTheDocument();
  });

  it('Accepts input from each field and submits', () => {
    const {
      email: { value: email },
      firstName: { value: firstName },
      lastName: { value: lastName },
      password: { value: password },
    } = EXAMPLE_PROFILE_INFO;
    const { getByPlaceholderText, getByText } = render(base());

    typeText(getByPlaceholderText(/email/), email);
    typeText(getByPlaceholderText(/first name/), firstName);
    typeText(getByPlaceholderText(/last name/), lastName);
    typeText(getByPlaceholderText(/password/), password);

    fireEvent.click(getByText(DEFAULT_SUBMIT_TEXT));

    expect(baseOnSubmit).toHaveBeenCalledTimes(1);
    expect(baseOnSubmit).toHaveBeenCalledWith({ email, firstName, lastName, password });
  });
});
