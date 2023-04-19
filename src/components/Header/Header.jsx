import React from 'react';
import Brand from './Brand';
import Profile from './Profile';
import Navigation from './Navigation';

function Header() {
  return (
    <header className='flex' style={{justifyContent: 'space-between'}}>
      <Brand />
      <Navigation />
      <Profile />
    </header>
  );
}

export default Header;
