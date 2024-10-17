// src/pages/DailyProgress.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content'; // Ensure the path is correct

function DailyProgress() {
    const [dailyData, setDailyData] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const navigate = useNavigate();

    // Fetch daily progress data
    useEffect(() => {
        const fetchDailyData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/daily/${selectedDate}`, 
                    { withCredentials: true }
                );

                if (response.data.length > 0) {
                    setDailyData(response.data[0]);
                    setMessage('');
                } else {
                    setMessage('No daily entry found for the selected date.');
                    setDailyData({});
                }
            } catch (error) {
                console.error('Error fetching daily data:', error);
                if (error.response?.status === 401) {
                    navigate('/login'); // Redirect if unauthorized
                } else {
                    setMessage('Failed to fetch daily progress.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDailyData();
    }, [selectedDate, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Content>
            <header>
                <h1>Daily Progress</h1>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button onClick={() => setLoading(true)}>Refresh</button>
            </header>

            {message && <p className="message">{message}</p>}

            {Object.keys(dailyData).length > 0 && (
                <div>
                    <h2>Daily Entry for {new Date(dailyData.date).toLocaleDateString()}</h2>
                    <p><strong>Tasks Completed:</strong> {dailyData.tasks_completed}</p>
                    <p><strong>Total Score:</strong> {dailyData.total_score}</p>

                    <h3>Sessions</h3>
                    <ul>
                        {dailyData.sessions.map(session => (
                            <li key={session._id}>
                                <strong>Minigame:</strong> {session.vr_minigame_name}, 
                                <strong> Score:</strong> {session.score}, 
                                <strong> Duration:</strong> {session.duration} seconds
                            </li>
                        ))}
                    </ul>

                    <h3>Todos</h3>
                    <ul>
                        {dailyData.todos.map(todo => (
                            <li key={todo._id}>
                                {todo.task_description} - 
                                {todo.is_completed ? ' Completed' : ' Not Completed'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Content>
    );
}

export default DailyProgress;
