import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';

function Home() {
  

  return (
    <Content>
      <header>
        <h1>Welcome to MotionMinds</h1>
      </header>
      {/* Other content of the home page */}
    </Content>
  );
}

export default Home;