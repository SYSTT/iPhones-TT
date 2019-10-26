import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import EL from '../../components/ExternalLink/ExternalLink';
import { QualityContainer } from './elements';

const Quality: React.FC = () => {
  return (
    <QualityContainer>
      <div>
        <h1>
          <Icon type="check" />
        </h1>
        <h1>Quality</h1>
      </div>
      <div>
        <h2>Testing Information</h2>
        <p>
          Our A-Grade iPhones are extensively tested to ensure the quality
          before sale. Tests include battery, screen and body checks for
          scratches, dents, etc.
        </p>
        <p>
          We use <EL link="https://www.phonecheck.com/">Phonecheck</EL> for{' '}
          <strong>industry standard used device certification</strong>.
        </p>
        <h2>Warranty Information</h2>
        <p>
          New iPhones are offered with a 1 Year Apple Warranty and all ​ A-Grade
          iPhones are offered with a 14 Day Warranty from us.
        </p>
        <Link to="/about">About us and more information</Link>
      </div>
    </QualityContainer>
  );
};

export default Quality;
