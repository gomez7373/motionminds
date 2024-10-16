import React, { useEffect } from 'react';
import axios from 'axios';

function Mountain() {
    useEffect(() => {
        const createSession = async () => {
            try {
                // Fetch the authenticated user data
                const userResponse = await axios.get('http://localhost:3000/api/user', { withCredentials: true });
                const user = userResponse.data.user;

                // Get today's date
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

                // Post the session data to the backend
                const sessionResponse = await axios.post('http://localhost:3000/api/session', {
                    user_id: user._id, // Include the authenticated user's ID
                    score: 100, // Set default score
                    vr_minigame_name: 'Mountain',
                    duration: 5, // Duration in seconds
                    date_played: today, // Include today's date
                }, { withCredentials: true });

                console.log('Session created:', sessionResponse.data);
            } catch (error) {
                console.error('Error creating session:', error);
            }
        };

        createSession();
    }, []);

    return (
        <div>
            <h1>Welcome to the Mountain</h1>
            <p>Enjoy breathtaking views and fresh air!</p>
        </div>
    );
}

export default Mountain;