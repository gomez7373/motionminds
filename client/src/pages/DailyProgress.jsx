import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DailyProgress.css';

function DailyProgress() {
  const [user, setUser] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDailyProgress();
    }
  }, [user, currentDate]);

  const fetchUser = async () => {
    try {
      const userRes = await axios.get('http://localhost:3000/api/user', { withCredentials: true });
      setUser(userRes.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setMessage('Failed to fetch user.');
      }
    }
  };

  const fetchDailyProgress = async () => {
    try {
        const dailyRes = await axios.get(
            `http://localhost:3000/api/daily/${currentDate}?user_id=${user._id}`,
            { withCredentials: true, validateStatus: (status) => status < 500 }
        );

        if (dailyRes.status === 404) {
            setMessage('No daily progress found. Consider creating one!');
            setDailyProgress(null);
        } else {
            setDailyProgress(dailyRes.data);
            setMessage('');
        }
    } catch (error) {
        console.error('Error fetching daily progress:', error);
        setMessage('Failed to fetch daily progress.');
    }
};

const createOrUpdateDailyProgress = async () => {
  try {
    const todosRes = await axios.get('http://localhost:3000/api/todo/today', { withCredentials: true });
    const sessionsRes = await axios.get('http://localhost:3000/api/session', { withCredentials: true });
    const moodRes = await axios.get(`http://localhost:3000/api/mood?user_id=${user._id}`, { withCredentials: true });

    const todos = todosRes.data;
    const sessions = sessionsRes.data;
    const mood = moodRes.data;

    if (todos.length === 0 && sessions.length === 0 && !mood._id) {
      setMessage('No Todos, Sessions, or Mood found to create or update daily progress.');
      return;
    }

    const dailyData = {
      user_id: user._id,
      date: currentDate,
      tasks_completed: todos.filter(todo => todo.is_completed).length,
      session_highscore: sessions.length > 0 ? Math.max(...sessions.map(session => session.score)) : 0,
      todo_id: todos.map(todo => todo._id),
      session_id: sessions.map(session => session._id),
      mood_id: mood._id || null,
      mood: mood.mood || ''
    };

    // Check if a daily entry already exists for the selected date
    if (dailyProgress) {
      // Perform a PUT request to update
      const dailyRes = await axios.put(`http://localhost:3000/api/daily/${dailyProgress._id}`, dailyData, { withCredentials: true });
      setDailyProgress(dailyRes.data);
      setMessage('Daily progress updated successfully!');
    } else {
      // Perform a POST request to create
      const dailyRes = await axios.post('http://localhost:3000/api/daily', dailyData, { withCredentials: true });
      setDailyProgress(dailyRes.data);
      setMessage('Daily progress created successfully!');
    }
  } catch (error) {
    console.error('Error creating or updating daily progress:', error);
    setMessage('Failed to create or update daily progress.');
  }
};

  return (
    <div className="daily-progress-container">
      <div className="progress-card">
        <h1 className="title">Daily Progress</h1>

        <div className="input-group">
          <label htmlFor="date" className="label">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="date-input"
          />
        </div>

        <button onClick={createOrUpdateDailyProgress} className="create-button">
          Create Daily Progress
        </button>

        {message && <p className="message">{message}</p>}

        {dailyProgress ? (
          <div className="progress-details">
            <h2>Tasks Completed: {dailyProgress.tasks_completed}</h2>
            <h2>Sessions Highscore: {dailyProgress.session_highscore}</h2>
            <h2>Mood: {dailyProgress.mood}</h2>
          </div>
        ) : (
          <p className="no-progress">No progress found for the selected date.</p>
        )}
      </div>
    </div>
  );
}

export default DailyProgress;