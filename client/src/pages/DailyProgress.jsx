import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const createDailyProgress = async () => {
    try {
      const todosRes = await axios.get('http://localhost:3000/api/todo/today', { withCredentials: true });
      const sessionsRes = await axios.get('http://localhost:3000/api/session', { withCredentials: true });

      const todos = todosRes.data;
      const sessions = sessionsRes.data;

      // Check if there's data to create daily progress
      if (todos.length === 0 && sessions.length === 0) {
        setMessage('No Todos or Sessions found to create daily progress.');
        return;
      }

      const newDaily = {
        user_id: user._id,
        date: currentDate,
        tasks_completed: todos.filter(todo => todo.is_completed).length,
        session_highscore: sessions.length > 0 ? Math.max(...sessions.map(session => session.score)) : 0,
        todo_id: todos.map(todo => todo._id),
        session_id: sessions.map(session => session._id),
      };

      await axios.post('http://localhost:3000/api/daily', newDaily, { withCredentials: true });

      // Update daily progress
      const updateRes = await axios.put(
        'http://localhost:3000/api/daily/update',
        { user_id: user._id, date: currentDate },
        { withCredentials: true }
      );

      console.log(updateRes.data);
      setDailyProgress(updateRes.data);
      setMessage('Daily progress created and updated successfully!');
    } catch (error) {
      console.error('Error creating or updating daily progress:', error);
      setMessage('Failed to create or update daily progress.');
    }
  };

  return (
    <div>
      <h1>Daily Progress</h1>
      <input
        type="date"
        value={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
      />
      <button onClick={createDailyProgress}>Create Daily Progress</button>
      {message && <p>{message}</p>}

      {dailyProgress ? (
        <div>
          <h2>Tasks Completed: {dailyProgress.tasks_completed}</h2>
          <h2>Sessions Highscore: {dailyProgress.session_highscore}</h2>
        </div>
      ) : (
        <p>No progress found for the selected date.</p>
      )}
    </div>
  );
}

export default DailyProgress;
