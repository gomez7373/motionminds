// client/src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#2d2159' }}>
      <img src="/assets/logo.png" alt="MotionMinds Logo" style={{ height: '50px', marginRight: '10px' }} />
      <h1 style={{ color: '#ffffff' }}>MotionMinds</h1>
    </header>
  );
};

export default Header;
