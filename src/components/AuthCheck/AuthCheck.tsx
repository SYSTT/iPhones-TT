import React, { useLayoutEffect } from 'react';
import { User } from 'firebase';

type Props = {
  user: User;
  fallback: React.ReactNode;
  children: React.ReactNode;
  requiredClaims?: Object;
};

function AuthCheck({
  user,
  fallback,
  children,
  requiredClaims,
}: Props) {
  useLayoutEffect(() => {
    if (requiredClaims && user) {
      user.getIdTokenResult().then(token => {
        const failedClaims = Object.entries(requiredClaims).filter(
          ([claim, value]) => token.claims[claim] !== value
        );
        if (failedClaims.length > 0) {
          throw new Error(`
            User does not have required claims: ${JSON.stringify(failedClaims)}`
          );
        }
      });
    }
  });
  if (!user) {
    console.warn(new Error(`User not authenticated`));
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

export default AuthCheck;
