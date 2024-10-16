import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Content from '../components/Content';

function VirtualSpaces() {
    const [user, setUser] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        setCurrentDate(today);

        // Fetch user data
        axios
            .get('http://localhost:3000/api/user', { withCredentials: true })
            .then((res) => {
                const { user } = res.data;
                setUser(user);

                // Fetch session data for today
                return axios.get('http://localhost:3000/api/session', {
                    params: { user_id: user._id, date: today },
                    withCredentials: true,
                });
            })
            .then((res) => {
                console.log('Received sessions:', res.data); // Debugging response
                setSessions(res.data);
            })
            .catch((err) => {
                console.error('Error fetching sessions:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login'); // Redirect if unauthorized
                } else if (err.response && err.response.status === 404) {
                    setMessage('No session found for today');
                } else {
                    setMessage('Failed to fetch sessions');
                }
            });
    }, [navigate]);

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <Content>
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">Virtual Spaces</h1>
                <p>{currentDate}</p> {/* Display current date */}
            </header>
            <div className="space-options flex justify-center space-x-4 my-4">
                <button className="space-option bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigateTo('/Beach')}>Beach</button>
                <button className="space-option bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigateTo('/Forest')}>Forest</button>
                <button className="space-option bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigateTo('/Mountain')}>Mountain</button>
            </div>
            {loading && <p>Loading...</p>}
            {message && <p className="message">{message}</p>}
            <div className="session-data flex flex-col mx-auto max-w-4xl">
                <h2 className="text-2xl text-center font-semibold mb-4">Today's sessions:</h2>
                {sessions.length > 0 ? (
                    sessions.map((session) => (
                        <div className="session-scores flex shadow-md rounded-lg p-4 mb-4" key={session._id}>
                            <p className="text-lg font-medium mr-4">Minigame: {session.vr_minigame_name}</p>
                            <p className="text-lg mr-4">Score: {session.score}</p>
                            <p className="text-lg mr-4">Duration: {session.duration} seconds</p>
                            <p className="text-lg">Date: {new Date(session.date_played).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg">No sessions found for today.</p>
                )}
            </div>
        </Content>
    );
}

export default VirtualSpaces;