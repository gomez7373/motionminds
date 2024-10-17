import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';

function Home() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const message = location.state?.message;
  const [firstName, setFirstName] = useState('');

 

  return (
    <Content>
      <header>
        <h1>Welcome to MotionMinds, {firstName}</h1>
      </header>
      {message && <p className="message">{message}</p>}
      {/* Other content of the home page */}
    </Content>
  );
}

export default Home;