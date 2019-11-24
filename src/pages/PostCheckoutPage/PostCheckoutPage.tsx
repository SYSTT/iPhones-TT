import React from 'react';
import { Heading, ButtonList, RoundedButton } from '../../utils';
import { Container } from './elements';
import { Link } from 'react-router-dom';

const PostCheckoutPage = () => {
  return (
    <Container>
      <Heading>Thank you!</Heading>
      <p>Your order has been submitted.</p>
      <p>
        We will review your order and give you a call once your order has been
        approved, to schedule a date and time for the transaction
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
