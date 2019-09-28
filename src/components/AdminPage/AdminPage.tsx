import React from 'react';
import { User } from 'firebase';

import AuthCheck from '../AuthCheck/AuthCheck';
import Heading from '../Heading/Heading';

type Props = {
  user: User;
};

function AdminPage({ user }: Props) {
  return (
    <AuthCheck user={user} fallback={<h1>No Access</h1>} requiredClaims={{ admin: true }}>
      <Heading title="Admin" text="Update stock" />
    </AuthCheck>
  );
}

export default AdminPage;
