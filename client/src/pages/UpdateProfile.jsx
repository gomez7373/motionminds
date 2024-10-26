import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content'; // Ensure the path is correct

function UpdateProfile() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/user', { 
            withCredentials: true 
        })
        .then(res => {
            const { user } = res.data; // Extract user from response data
            setUser(user);
            setFormData(user); // Initialize form data with user data
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login'); // Redirect to login if unauthorized
            }
        });
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.put(`http://localhost:3000/api/user/${user._id}`, formData, { withCredentials: true });
            setMessage('Profile updated successfully');
            setUser(response.data.user); // Update user state with the updated user data
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Content>
            <header>
                <h1>Profile</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <div>
                    <label>Profile Picture URL:</label>
                    <input
                        type="text"
                        name="profile_picture"
                        value={formData.profile_picture || ''}
                        onChange={handleChange}
                        className='text-gray-600'
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
                {message && <p className="message">{message}</p>}
            </form>
        </Content>
    );
}

export default UpdateProfile;