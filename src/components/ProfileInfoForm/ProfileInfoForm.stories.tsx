import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ProfileInfoForm from './ProfileInfoForm';
import { DEFAULT_SUBMIT_TEXT } from './constants';

export default { title: 'Profile Information Form' };

export const baseOnSubmit = jest.fn();
export const base = () => (
  <ProfileInfoForm onSubmit={baseOnSubmit} submitText={'Submit'} />
);

export const playground = () => {
  const submitText = text('Submit Button Text', DEFAULT_SUBMIT_TEXT);
  return <ProfileInfoForm onSubmit={() => {}} submitText={submitText} />
};
playground.story = {
  decorators: [withKnobs],
};
