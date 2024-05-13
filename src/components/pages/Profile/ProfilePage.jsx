import React from 'react';
import { Loading } from '../Loading';
import '../../../styles/ProfilePage.less';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function ProfilePage() {
  const { user } = useAuth0();
  console.log(user);
  const { name, nickname, picture, email, updated_at } = user;

  return (
    <div className="profile-container">
      <div>
        <img className="profile-image" src={picture} alt="Profile"></img>
        <div className="profile-name">
          {name} ({nickname})
        </div>
      </div>
      <div className="proflie-email">{email}</div>
      <div>Last updated: {updated_at}</div>
    </div>
  );
}

export default withAuthenticationRequired(ProfilePage, {
    onRedirecting: () => <Loading/>, 
});
