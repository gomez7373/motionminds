import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content'; // Ensure the path is correct
import '../styles/Profile.css'; // Import the CSS file

function Profile() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/user', { 
            withCredentials: true 
        })
        .then(res => {
            console.log('Response data:', res.data); // Log the response data
            const { user } = res.data; // Extract user from response data
            setUser(user);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login'); // Redirect to login if unauthorized
            }
        });
    }, [navigate]);

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Content>
            <div className="profile-container">
                <header className="profile-header">
                    <h1>Profile</h1>
                </header>
                <div>
                    <img 
                        src={user.profile_picture} 
                        alt="Profile" 
                        className="profile-picture" 
                    />
                    <p className="profile-detail"><strong>Username:</strong> {user.username}</p>
                    <p className="profile-detail"><strong>Email:</strong> {user.email}</p>
                    <p className="profile-detail"><strong>First Name:</strong> {user.first_name}</p>
                    <p className="profile-detail"><strong>Last Name:</strong> {user.last_name}</p>
                    <p className="profile-detail"><strong>Location:</strong> {user.location}</p>
                    <p className="profile-detail"><strong>Date of Birth:</strong> {formatDate(user.date_of_birth)}</p>
                    <p className="profile-detail"><strong>Gender:</strong> {user.gender}</p>
                    <p className="profile-detail"><strong>Phone:</strong> {user.phone}</p>
                    <p className="profile-detail"><strong>Date Created:</strong> {formatDate(user.date_created)}</p>
                    <p className="profile-detail"><strong>Last Login:</strong> {formatDate(user.last_login)}</p>
                </div>
            </div>
        </Content>
    );
}

export default Profile;