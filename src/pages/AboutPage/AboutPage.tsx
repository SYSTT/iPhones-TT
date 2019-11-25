import React from 'react';
import { Heading } from '../../utils';
import { Container } from './elements';

const AboutPage = () => {
  return (
    <Container>
      <Heading>About Us</Heading>
      <p>Welcome to T&T Mobile Delivery!</p>
      <p>
        We’re on a mission to make it safe, fast & easy for you to TRADE & BUY
        iPhones in T&T. With your support & encouragement we’ve become the #1
        iPhone Authority in T&T!
      </p>
      <p>
        With hundreds of successful iPhone transactions completed over the
        years, you can TRUST us for the best experience when trading or buying
        iPhones locally in Trinidad & Tobago.
      </p>
      <h2>Our Philosphy</h2>
      <p>
        We believe that businesses should create solutions that customers
        demand. We should make products & services that you want. Thank you
        believing in us & trusting us to deliver a quality service second to
        none!
      </p>
      <h2>Contact Us</h2>
      <p>
        Something wrong with our site or your order? Need more information? Want
        to tell us how we can improve?
      </p>
      <p>
        Email us at{' '}
        <a href="mailto:tntmobiledelivery@gmail.com">
          tntmobiledelivery@gmail.com
        </a>
      </p>
      <p>
        or call us at <a href="tel:+18682791417">1-868-279-1417</a>.
      </p>
      <h2>Warranty Information</h2>
      <p>We trade & sell A-Grade & New iPhones ONLY.</p>
      <p>
        All A-Grade iPhones include a standard 14-Day Warranty against
        manufacturer defects. All New iPhones include 1 Year Warranty from
        Apple.
      </p>
      <p>
        A-Grade iPhones may include iPhones that have had its screen or battery
        replaced or other minor repairs completed in the past.
      </p>
      <p>
        <strong>A-Grade</strong> means the iPhone is in perfect working
        condition & near perfect physical condition.
      </p>
      <p>
        <strong>New</strong> means the iPhone is sealed in plastic with all
        official contents, accessories & never opened or used.
      </p>
    </Container>
  );
};

export default AboutPage;
