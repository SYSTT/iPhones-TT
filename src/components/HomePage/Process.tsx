import React from 'react';
import { Button } from 'antd';

import {
  ProcessContainer,
} from './elements';

type Props = {
  title: string;
  steps: string[];
  buttonText: string;
};

function Process({
  title,
  steps,
  buttonText,
}: Props) {
  return (
    <ProcessContainer>
      <h1>{title}</h1>
      <ol>
        {steps.map(step => <li key={step}>{step}</li>)}
      </ol>
      <Button type="primary" block>{buttonText}</Button>
    </ProcessContainer>
  );
}

export default Process;
