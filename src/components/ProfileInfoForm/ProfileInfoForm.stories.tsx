import React from 'react';
import ProfileInfoForm from './ProfileInfoForm';

export default { title: 'Profile Information Form' };

export const base = () => (
  <ProfileInfoForm onSubmit={() => {}} submitText={'Submit'} />
);
