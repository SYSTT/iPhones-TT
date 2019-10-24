import React from 'react';
import { Button } from 'antd';

import { ProcessContainer } from './elements';
import { Heading } from '../../utils';

type Props = {
  title: string;
  steps: string[];
  buttonText: string;
};

const Process: React.FC<Props> = ({ title, steps, buttonText }) => {
  return (
    <ProcessContainer>
      <Heading>{title}</Heading>
      <ol>
        {steps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Button type="primary" block>
        {buttonText}
      </Button>
    </ProcessContainer>
  );
};

export default Process;
