import React from 'react';
import { Heading } from '../../utils';
import { Container } from './elements';

const AboutPage = () => {
  return (
    <Container>
      <Heading>About Us</Heading>
      <p>
        Our goal at T&T Mobile delivery is to make it safer, faster and easier
        for you to buy and trade iPhones in T&T. We want to make purchasing an
        iPhone as simple and enjoyable of an experience as possible for you.
      </p>
      <p>
        With over 100+ transactions already served you can trust us for the best
        experience when buying or trading iPhones.
      </p>
      <h2>Contact Us</h2>
      <p>
        See something wrong with the site or your order? Need more information?
      </p>
      <p>
        Shoot us an email at{' '}
        <a href="mailto:tntmobiledelivery@gmail.com">
          tntmobiledelivery@gmail.com
        </a>
      </p>
      <p>
        or call us at <a href="tel:+18684981026">498-1026</a>.
      </p>
      <h2>Warranty Information</h2>
      <p>
        All A-Grade iPhones from us include a 14-Day Warranty. All New iPhones
        include Apple’s 1 Year Warranty.
      </p>
    </Container>
  );
};

export default AboutPage;
