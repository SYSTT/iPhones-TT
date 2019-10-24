import React, { useState } from 'react';
import './LoginForm.css';

import Button from './../../Button/Button';

type Props = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="LoginForm">
      <label htmlFor="LoginForm-email">Email Address:</label>
      <input
        type="email"
        id="LoginForm-email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor="LoginForm-password">Password:</label>
      <input
        type="password"
        id="LoginForm-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button text="Login" onClick={() => onSubmit(email, password)} />
    </div>
  );
};

export default LoginForm;
