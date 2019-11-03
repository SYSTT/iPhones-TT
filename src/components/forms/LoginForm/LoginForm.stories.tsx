import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';

import LoginForm from './LoginForm';
import { LoginInfoValues } from './types';
import { DEFAULT_SUBMIT_TEXT } from './constants';

export default { title: 'Login Form' };

export const base = (
  onSubmit: (profileInfo: LoginInfoValues) => void = () => {},
) => <LoginForm onSubmit={onSubmit} />;

export const playground = () => {
  const submitText = text('Submit Button Text', DEFAULT_SUBMIT_TEXT);
  return <LoginForm onSubmit={() => {}} submitText={submitText} />;
};
playground.story = {
  decorators: [withKnobs],
};
