import React, { useState } from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';

const { primary_accent_color } = colors;

function HeaderContent() {
  let [loggedIn, setLoggedIn] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div>
        <Link
          to="/"
          style={{ color: '#E2F0F7', marginLeft: '35px', marginRight: '35px' }}
        >
          Home
        </Link>
        <Link
          to="/graphs"
          style={{ color: '#E2F0F7', marginLeft: '35px', marginRight: '35px' }}
        >
          Graphs
        </Link>
        <Link
          to="/graphs"
          style={{ color: '#E2F0F7', marginLeft: '35px', marginRight: '35px' }}
        >
          {loggedIn ? <a style={{color: '#E2F0F7'}} onClick={signOutHandler}>Sign Out</a> : 'Sign In'}
        </Link>
        {loggedIn && (
          <Link
            style={{
              color: '#E2F0F7',
              marginLeft: '35px',
              marginRight: '35px',
            }}
          >
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
