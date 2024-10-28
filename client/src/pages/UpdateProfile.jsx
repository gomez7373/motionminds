import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content'; // Ensure the path is correct
import '../styles/UpdateProfile.css'; // Import the CSS file

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
        return <div className="loading-message">Loading...</div>; // Updated loading message
    }

    return (
        <Content>
            <div className="update-profile-container">
                <header className="update-profile-header">
                    <h1>Update Profile</h1>
                </header>
                <form onSubmit={handleSubmit} className="update-profile-form">
                    <div className="form-field">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender || ''}
                            onChange={handleChange}
                            className='input-field'
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer_not_to_specify">I prefer not to specify</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <div className="form-field">
                        <label>Profile Picture URL:</label>
                        <input
                            type="text"
                            name="profile_picture"
                            value={formData.profile_picture || ''}
                            onChange={handleChange}
                            className='input-field'
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </Content>
    );
}

export default UpdateProfile;