import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import {
  Container,
  Cover,
  SpotlightImage,
  CoverLinks,
  Banner,
  ProcessSection,
} from './elements';

import CoverImage from './cover.jpg';
import Highlights from './Highlights';
import Process from './Process';
import Quality from './Quality';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Cover>
        <SpotlightImage src={CoverImage} alt="iPhones" />
        <Banner>
          <h1>Quality Devices. Best Prices. Great Service.</h1>
          <h3>
            The best place to <strong>buy</strong> and <strong>trade</strong>{' '}
            iPhones in Trinidad and Tobago.
          </h3>
          <CoverLinks>
            <Button type="default">
              <Link to="/trade">Trade Now</Link>
            </Button>
            <Button type="primary">
              <Link to="/buy">Shop Now</Link>
            </Button>
          </CoverLinks>
        </Banner>
      </Cover>
      <Highlights />
      <ProcessSection>
        <Process
          title="Purchase iPhones"
          steps={[
            'Choose your model, memory and color online.',
            'Schedule a time to meet at a police station.',
            'Meet, complete transaction and take home your new iPhone.',
          ]}
          buttonText="Purchase Now"
        />
        <Process
          title="Trade iPhones"
          steps={[
            'Enter some information on your device online.',
            'Choose your model, memory and color.',
            'View cash difference required/offered.',
            'Schedule a time to meet at a police station.',
            'Meet, complete transaction and trade iPhone.',
          ]}
          buttonText="Trade Now"
        />
      </ProcessSection>
      <Quality />
    </Container>
  );
};

export default HomePage;
