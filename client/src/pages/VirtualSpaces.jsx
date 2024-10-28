import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Content from '../components/Content';
import '../styles/VirtualSpaces.css'; // Import the CSS file

function VirtualSpaces() {
    const [user, setUser] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        setCurrentDate(formattedDate);

        // Fetch user data
        axios
            .get('http://localhost:3000/api/user', { withCredentials: true })
            .then((res) => {
                const { user } = res.data;
                setUser(user);

                // Fetch session data for today
                return axios.get('http://localhost:3000/api/session', {
                    params: { user_id: user._id, date: today.toISOString().split('T')[0] },
                    withCredentials: true,
                });
            })
            .then((res) => {
                console.log('Received sessions:', res.data);
                setSessions(res.data);
            })
            .catch((err) => {
                console.error('Error fetching sessions:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <Content>
            <header className="header">
                <h1 className="title">Explore Virtual Spaces</h1>
                <p className="date">{currentDate}</p>
            </header>

            <div className="space-options">
                <button className="space-option" onClick={() => navigateTo('/Beach')}>
                    Beach
                </button>
                <button className="space-option" onClick={() => navigateTo('/Forest')}>
                    Forest
                </button>
                <button className="space-option" onClick={() => navigateTo('/Mountain')}>
                    Mountain
                </button>
            </div>

            {loading && <p className="loading">Loading...</p>}

            <div className="session-data">
                <h2 className="session-title">Today's Sessions</h2>

                {sessions.length > 0 ? (
                    sessions.map((session) => (
                        <div key={session._id} className="session-card">
                            <div className="session-info">
                                <p className="session-minigame">
                                    Minigame: <span className="session-detail">{session.vr_minigame_name}</span>
                                </p>
                                <p className="session-score">
                                    Score: <span className="session-detail">{session.score}</span>
                                </p>
                                <p className="session-duration">
                                    Duration: <span className="session-detail">{session.duration} seconds</span>
                                </p>
                            </div>
                            <div className="date-container">
                                <p className="session-date">
                                    Date: <span className="session-detail">{new Date(session.date_played).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-sessions">No sessions found for today.</p>
                )}
            </div>
        </Content>
    );
}

export default VirtualSpaces;
