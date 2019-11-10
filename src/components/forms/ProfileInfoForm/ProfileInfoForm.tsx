import React, { useState } from 'react';
import { Input, Icon, Tooltip, Divider, Spin } from 'antd';

import {
  ButtonList,
  RoundedButton,
  isValidEmail,
  isValidPassword,
} from '../../../utils';
import { FormContainer } from '../elements';
import {
  EMPTY_PROFILE_INFO,
  DEFAULT_SUBMIT_TEXT,
  EMPTY_PROFILE_INFO_VALUES,
} from './constants';
import { ProfileInfoValues, ProfileInfo } from './types';
import ErrorIcon from '../ErrorIcon';

interface Props {
  onSubmit: (profileInfo: ProfileInfoValues) => void;
  submitText?: string;
  submitting?: boolean;
}

function getValues(formInfo: ProfileInfo) {
  return Object.keys(formInfo).reduce<ProfileInfoValues>((acc, key) => {
    acc[key] = formInfo[key].value;
    return acc;
  }, EMPTY_PROFILE_INFO_VALUES);
}

const ProfileInfoForm: React.FC<Props> = ({
  onSubmit,
  submitText = DEFAULT_SUBMIT_TEXT,
  submitting = false,
}) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(
    EMPTY_PROFILE_INFO,
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof ProfileInfo) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfileInfo({ ...profileInfo, [field]: { value: e.target.value } });
  };

  const validateProfileInfo = (profileInfo: ProfileInfo) => {
    const newProfileInfo = { ...profileInfo };
    let errorFound = false;
    Object.keys(profileInfo).reduce((acc, key) => {
      if (!acc[key].value && key !== 'password') {
        acc[key].error = 'This field is required';
        errorFound = true;
        return acc;
      }
      if (key === 'email' && !isValidEmail(acc[key].value)) {
        acc[key].error = 'Email address is invalid';
        errorFound = true;
        return acc;
      }
      if (
        key === 'password' &&
        acc[key].value &&
        !isValidPassword(acc[key].value)
      ) {
        acc[key].error = 'Password must be at least 8 characters long';
        errorFound = true;
        return acc;
      }
      return acc;
    }, newProfileInfo);

    return { errorFound, newProfileInfo };
  };

  const handleSubmit = () => {
    const { errorFound, newProfileInfo } = validateProfileInfo(profileInfo);
    if (errorFound) {
      setProfileInfo(newProfileInfo);
      return;
    }
    onSubmit(getValues(profileInfo));
  };

  const { email, firstName, lastName, password, phoneNumber } = profileInfo;

  return (
    <FormContainer>
      <Input
        type="email"
        placeholder="Enter your email address"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <>
            {email.error && <ErrorIcon error={email.error} />}
            <Tooltip title="We will email you with receipts and order confirmations">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </>
        }
        value={email.value}
        onChange={handleChange('email')}
      />
      <Input
        type="text"
        placeholder="Enter your first name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={firstName.error && <ErrorIcon error={firstName.error} />}
        value={firstName.value}
        onChange={handleChange('firstName')}
      />
      <Input
        type="text"
        placeholder="Enter your last name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={lastName.error && <ErrorIcon error={lastName.error} />}
        value={lastName.value}
        onChange={handleChange('lastName')}
      />
      <Input
        type="tel"
        placeholder="Enter your phone number"
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <>
            {phoneNumber.error && <ErrorIcon error={phoneNumber.error} />}
            <Tooltip title="Dashes, spaces and brackets aren't required">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
            </Tooltip>
          </>
        }
        value={phoneNumber.value}
        onChange={handleChange('phoneNumber')}
      />
      <Divider />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter optional password to create account"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <>
            {password.value !== '' && (
              <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                <Icon
                  type={showPassword ? 'eye-invisible' : 'eye'}
                  style={{ color: 'rgba(0,0,0,.45)', marginInlineEnd: 8 }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Tooltip>
            )}
            {password.error && <ErrorIcon error={password.error} />}
            <Tooltip title="The next time you make an order you can skip this form by entering your email address and this password">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </>
        }
        value={password.value}
        onChange={handleChange('password')}
      />
      <ButtonList center>
        <Spin spinning={submitting}>
          <RoundedButton type="primary" onClick={handleSubmit}>
            {submitText}
          </RoundedButton>
        </Spin>
      </ButtonList>
    </FormContainer>
  );
};

export default ProfileInfoForm;
