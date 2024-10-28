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
        console.log('User:', user);
        axios.get('http://localhost:3000/api/user', { 
            withCredentials: true 
        })
        .then(res => {
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
                    <p className="profile-detail"><strong>Date of Birth:</strong> {new Date(user.date_of_birth).toLocaleDateString()}</p>
                    <p className="profile-detail"><strong>Gender:</strong> {user.gender}</p>
                    <p className="profile-detail"><strong>Phone:</strong> {user.phone}</p>
                    <p className="profile-detail"><strong>Date Created:</strong> {new Date(user.date_created).toLocaleDateString()}</p>
                    <p className="profile-detail"><strong>Last Login:</strong> {new Date(user.last_login).toLocaleDateString()}</p>
                </div>
            </div>
        </Content>
    );
}

export default Profile;
