import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Loading() {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return (
    <div> 
        ...
    </div>
  );
};