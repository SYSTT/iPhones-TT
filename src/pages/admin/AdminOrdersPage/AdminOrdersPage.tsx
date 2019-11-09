import React from 'react';
import { User } from 'firebase';
import { Spin } from 'antd';

import { Heading } from '../../../utils';
import AuthCheck from '../../../components/AuthCheck/AuthCheck';
import { Container } from './element';
import { useAuth } from '../../../modules/auth';

type Props = {
  user: User | null;
};

const AdminOrdersPage: React.FC<Props> = () => {
  const { user } = useAuth();
  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Container>
        <Heading>Orders</Heading>
        <p>Buy Orders</p>
        <p>Trade Orders</p>
      </Container>
    </AuthCheck>
  );
};

export default AdminOrdersPage;
