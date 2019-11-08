import React from 'react';
import { Button } from 'antd';

import { ProcessContainer } from './elements';
import { Heading } from '../../utils';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  steps: string[];
  buttonText: string;
  buttonLink: string;
};

const Process: React.FC<Props> = ({ title, steps, buttonText, buttonLink }) => {
  return (
    <ProcessContainer>
      <Heading>{title}</Heading>
      <ol>
        {steps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Link to={buttonLink}>
        <Button type="primary" block>
          {buttonText}
        </Button>
      </Link>
    </ProcessContainer>
  );
};

export default Process;
