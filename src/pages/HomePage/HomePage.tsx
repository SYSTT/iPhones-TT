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
          <h1>
            T&T’s #1 iPhone Authority. Quality iPhones. Best Prices. Great
            Service.
          </h1>
          <h3>
            The best place to <strong>buy</strong> and <strong>trade</strong>{' '}
            iPhones in Trinidad and Tobago.
          </h3>
          <CoverLinks>
            <Button type="default">
              <Link to="/buy">Buy Now</Link>
            </Button>
            <Button type="primary">
              <Link to="/trade">Trade Now</Link>
            </Button>
          </CoverLinks>
        </Banner>
      </Cover>
      <Highlights />
      <ProcessSection>
        <Process
          title="Trade your iPhones"
          steps={[
            'Tell us about your iPhone.',
            'Select the iPhone you want.',
            'Get your estimated Cash Difference NOW!',
            'We review details on your iPhone.',
            'Get a call to schedule your trade.',
            'We meet, trade & upgrade your iPhone!',
          ]}
          buttonText="Trade Now"
          buttonLink="/trade/"
        />
        <Process
          title="Buy iPhones"
          steps={[
            'Select the iPhone(s) you’d like to buy.',
            'Add iPhone(s) to Cart.',
            'Checkout!',
            'Get a call to schedule your purchase',
            'Choose between Pickup or Delivery',
            'We meet & you get your iPhone!',
          ]}
          buttonText="Buy Now"
          buttonLink="/buy/"
        />
      </ProcessSection>
      <Quality />
    </Container>
  );
};

export default HomePage;
