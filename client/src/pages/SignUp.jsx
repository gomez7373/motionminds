import React, { useState } from 'react';
import axios from 'axios';
import Content from '../components/Content';

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    try {
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      setMessage('User registered successfully');
      setFormData({ first_name: '', last_name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        if (error.response.data.errors) {
          // Handle validation errors
          const validationErrors = {};
          error.response.data.errors.forEach(err => {
            validationErrors[err.path] = err.msg;
          });
          setErrors(validationErrors);
        } else if (error.response.data.message === 'User already exists') {
          setMessage('User already exists. Please use a different email.');
        } else {
          setMessage(`Error: ${error.response.data.error || 'Registration failed'}`);
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
        <h1>Create Your Account</h1>
      </header>
      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </Content>
  );
}

export default SignUp;