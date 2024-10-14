import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Store error message

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUser(data); // Save user data to state
    } catch (error) {
      setError(error.message); // Save error message to state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Profile</h1>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message if request fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display user data if available */}
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Profile Picture:</strong> <img src={user.profile_picture} alt="Profile" /></p>
          <p><strong>Date Created:</strong> {new Date(user.date_created).toLocaleDateString()}</p>
          <p><strong>Last Login:</strong> {new Date(user.last_login).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;