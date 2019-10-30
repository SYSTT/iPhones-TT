import React, { useState } from 'react';
import { Input, Icon, Tooltip, Divider } from 'antd';

import { Container } from './elements';
import { EMPTY_PROFILE_INFO } from './constants';
import { ButtonList, RoundedButton, isValidEmail } from '../../utils';

interface FormField<T> {
  value: T;
  error?: string;
}

interface ProfileInfo {
  email: FormField<string>;
  firstName: FormField<string>;
  lastName: FormField<string>;
  password: FormField<string>;
}

interface Props {
  onSubmit: (profileInfo: ProfileInfo) => void;
  submitText: string;
}

const ProfileInfoForm: React.FC<Props> = ({ onSubmit, submitText }) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(
    EMPTY_PROFILE_INFO,
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof ProfileInfo) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfileInfo({ ...profileInfo, [field]: { value: e.target.value } });
  };

  const handleSubmit = () => {
    onSubmit(profileInfo);
  };

  const { email, firstName, lastName, password } = profileInfo;

  return (
    <Container>
      <Input
        type="email"
        placeholder="Enter your email address"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <Tooltip title="We will email you with receipts and order confirmations">
            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
        value={email.value}
        onChange={handleChange('email')}
      />
      <Input
        type="text"
        placeholder="Enter your first name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={firstName.value}
        onChange={handleChange('firstName')}
      />
      <Input
        type="text"
        placeholder="Enter your last name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={lastName.value}
        onChange={handleChange('lastName')}
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
            <Tooltip title="The next time you make an order you can skip this form by entering your email address and this password">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </>
        }
        value={password.value}
        onChange={handleChange('password')}
      />
      <ButtonList center>
        <RoundedButton type="primary" onClick={handleSubmit}>
          {submitText}
        </RoundedButton>
      </ButtonList>
    </Container>
  );
};

export default ProfileInfoForm;
