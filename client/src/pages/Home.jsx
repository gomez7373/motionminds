import React from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../components/Content';
import LogoutButton from '../components/LogoutButton';
function Home() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <Content>
      <header>
        <h1>Welcome to MotionMinds</h1>
      </header>
      {message && <p className="message">{message}</p>}
      {/* Other content of the home page */}
      <LogoutButton />
    </Content>
  );
}

export default Home;