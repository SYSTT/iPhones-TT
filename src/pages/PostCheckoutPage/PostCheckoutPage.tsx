import React from 'react';
import { Heading, ButtonList, RoundedButton } from '../../utils';
import { Container } from './elements';
import { Link } from 'react-router-dom';

const PostCheckoutPage = () => {
  return (
    <Container>
      <Heading>Thank you!</Heading>
      <p>
        Your order has been submitted. We&#39;ll call you within 24 hours to
        confirm your order.
      </p>
      <ButtonList center>
        <Link to="/">
          <RoundedButton type="primary">Back to homepage</RoundedButton>
        </Link>
      </ButtonList>
    </Container>
  );
};

export default PostCheckoutPage;
