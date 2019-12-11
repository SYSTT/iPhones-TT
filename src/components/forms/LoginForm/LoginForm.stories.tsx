import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import LoginForm from './LoginForm';
import { LoginInfoValues } from './types';
import { DEFAULT_SUBMIT_TEXT } from './constants';

export default { title: 'Login Form' };

export const base = (
  onSubmit: (profileInfo: LoginInfoValues) => void = action('onSubmit'),
) => <LoginForm onSubmit={onSubmit} />;

export const playground = () => {
  const submitText = text('Submit Button Text', DEFAULT_SUBMIT_TEXT);
  return <LoginForm onSubmit={action('onSubmit')} submitText={submitText} />;
};
playground.story = {
  decorators: [withKnobs],
};
