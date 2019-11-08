import React, { useState } from 'react';
import { Icon, Input, Tooltip } from 'antd';

import { FormContainer } from '../elements';
import { LoginInfoValues, LoginInfo } from './types';
import {
  EMPTY_LOGIN_INFO,
  EMPTY_LOGIN_INFO_VALUES,
  DEFAULT_SUBMIT_TEXT,
} from './constants';
import ErrorIcon from '../ErrorIcon';
import {
  ButtonList,
  RoundedButton,
  isValidEmail,
  isValidPassword,
} from '../../../utils';
import { useUserData } from '../../../modules/userData';

interface Props {
  onSubmit: (loginInfo: LoginInfoValues) => Promise<void> | void;
  submitText?: string;
}

function getValues(loginInfo: LoginInfo) {
  return Object.keys(loginInfo).reduce<LoginInfoValues>((acc, key) => {
    acc[key] = loginInfo[key].value;
    return acc;
  }, EMPTY_LOGIN_INFO_VALUES);
}

const LoginForm = ({ onSubmit, submitText = DEFAULT_SUBMIT_TEXT }: Props) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(EMPTY_LOGIN_INFO);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useUserData();

  const login = async (values: LoginInfoValues) => {
    await loginUser(values.email, values.password);
    onSubmit(values);
  };

  const handleChange = (field: keyof LoginInfo) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoginInfo({ ...loginInfo, [field]: { value: e.target.value } });
  };

  const validateLogLoginInfo = (loginInfo: LoginInfo) => {
    const newLogLoginInfo = { ...loginInfo };
    let errorFound = false;
    Object.keys(loginInfo).reduce((acc, key) => {
      if (!acc[key].value) {
        acc[key].error = 'This field is required';
        errorFound = true;
        return acc;
      }
      if (key === 'email' && !isValidEmail(acc[key].value)) {
        acc[key].error = 'Email address is invalid';
        errorFound = true;
        return acc;
      }
      if (key === 'password' && !isValidPassword(acc[key].value)) {
        acc[key].error = 'Password must be at least 8 characters long';
        errorFound = true;
        return acc;
      }
      return acc;
    }, newLogLoginInfo);

    return { errorFound, newLogLoginInfo };
  };

  const handleSubmit = () => {
    const { errorFound, newLogLoginInfo } = validateLogLoginInfo(loginInfo);
    if (errorFound) {
      setLoginInfo(newLogLoginInfo);
      return;
    }
    login(getValues(loginInfo));
  };

  const { email, password } = loginInfo;
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
        <RoundedButton type="primary" onClick={handleSubmit}>
          {submitText}
        </RoundedButton>
      </ButtonList>
    </FormContainer>
  );
};

export default LoginForm;
