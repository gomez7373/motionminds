import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content'; // Ensure the path is correct

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
        return <div>Loading...</div>;
    }

    return (
        <Content>
            <header>
                <h1>Profile</h1>
            </header>
            <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Date of Birth:</strong> {new Date(user.date_of_birth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Profile Picture:</strong> <img src={user.profile_picture} alt="Profile" /></p>
                <p><strong>Date Created:</strong> {new Date(user.date_created).toLocaleDateString()}</p>
                <p><strong>Last Login:</strong> {new Date(user.last_login).toLocaleDateString()}</p>
            </div>
        </Content>
    );
}

export default Profile;