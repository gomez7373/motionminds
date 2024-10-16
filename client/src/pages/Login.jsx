import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import { AuthContext } from '../context/AuthContext'; // Ensure you import the AuthContext

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get the login function from context

    useEffect(() => {
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
            localStorage.setItem('token', response.data.token);

            if (response.data.user && response.data.user.first_name) {
                localStorage.setItem('userFirstName', response.data.user.first_name);
                login(); // Update the authentication status in context
                navigate('/', { state: { message: `Welcome, ${response.data.user.first_name}!` } });
            } else {
                setMessage('Login successful, but user data is missing.');
            }
        } catch (error) {
            // Handle errors as before
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
