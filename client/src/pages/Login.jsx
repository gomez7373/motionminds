import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { state: { message: 'You are already logged in!' } });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData, { withCredentials: true });
      setMessage('Login successful');
      // Store login state in local storage
      localStorage.setItem('token', response.data.token);
      console.log('Stored Token:', localStorage.getItem('token'));

      if (response.data.user && response.data.user.first_name) {
        localStorage.setItem('userFirstName', response.data.user.first_name); // Store user's first name
        console.log('Current user response:', response.data.user); // Log the user data
        // Redirect to home route on successful login with state
        navigate('/', { state: { message: `Welcome, ${response.data.user.first_name}!` } });
      } else {
        setMessage('Login successful, but user data is missing.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        if (error.response.data.errors) {
          // Handle validation errors
          const validationErrors = {};
          error.response.data.errors.forEach(err => {
            validationErrors[err.param] = err.msg;
          });
          setErrors(validationErrors);
        } else {
          setMessage(`Error: ${error.response.data.message || 'Login failed'}`);
        }
      } else {
        console.error('Network error:', error);
        setMessage('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <header>
        <h1>Login to MotionMinds</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='text-gray-600'
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='text-gray-600'
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </Content>
  );
}

export default Login;