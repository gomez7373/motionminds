import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ensure the path is correct

function LogoutButton() {
  const { logout } = useContext(AuthContext); // Get the logout function from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/logout', 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );

      localStorage.removeItem('token');
      sessionStorage.clear();
      logout(); // Update the authentication status in context
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
