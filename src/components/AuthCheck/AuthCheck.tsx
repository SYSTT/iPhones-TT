import React, { useLayoutEffect } from 'react';
import { User } from 'firebase';

type Props = {
  user: User | null;
  fallback: React.ReactNode;
  children: React.ReactNode;
  requiredClaims?: Record<string, boolean>;
};

const AuthCheck: React.FC<Props> = ({
  user,
  fallback,
  children,
  requiredClaims,
}) => {
  useLayoutEffect(() => {
    if (requiredClaims && user) {
      user.getIdTokenResult().then(token => {
        const failedClaims = Object.entries(requiredClaims).filter(
          ([claim, value]) => token.claims[claim] !== value,
        );
        if (failedClaims.length > 0) {
          throw new Error(`
            User does not have required claims: ${JSON.stringify(
              failedClaims,
            )}`);
        }
      });
    }
  });
  if (!user) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

export default AuthCheck;
