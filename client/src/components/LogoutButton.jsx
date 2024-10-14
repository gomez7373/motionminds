import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the API logout route
      await axios.post('http://localhost:3000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Clear the token from local storage
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/login', { state: { message: 'You have been logged out!' } });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;