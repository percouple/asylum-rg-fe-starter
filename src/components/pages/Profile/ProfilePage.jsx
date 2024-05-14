import React from 'react';
import { Loading } from '../Loading';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function ProfilePage() {
  const { user } = useAuth0();

  const { name, nickname, picture, email, updated_at } = user;

  let printDate = new Date(updated_at).toLocaleString();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '6rem',
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: '6rem',
        minHeight: '40vh',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <img className="profile-image" src={picture} alt="Profile"></img>
        <div style={{ marginLeft: '1rem' }}>
          {name} ({nickname})
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>{email}</div>
      <div>Last modified: {printDate}</div>
    </div>
  );
}

export default withAuthenticationRequired(ProfilePage, {
  onRedirecting: () => <Loading />,
});
