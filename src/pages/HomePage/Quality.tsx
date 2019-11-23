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
        <h1>A-Grade Quality</h1>
      </div>
      <div>
        <h2>Testing Information</h2>
        <p>
          Our A-Grade iPhones are extensively tested to ensure their quality
          before it gets to you. Tests include battery, screen and body checks
          for scratches, dents, etc.
        </p>
        <p>
          We use <EL link="https://www.phonecheck.com/">Phonecheck</EL> for{' '}
          <strong>
            industry standard, enterprise-grade used device certification
          </strong>
          .
        </p>
        <h2>Warranty Information</h2>
        <p>
          All A-Grade iPhones from us include a 14-Day Warranty. All New iPhones
          include Apple’s 1 Year Warranty.
        </p>
        <Link to="/about">About us and more information</Link>
      </div>
    </QualityContainer>
  );
};

export default Quality;
