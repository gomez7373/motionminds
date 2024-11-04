import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [user, setUser] = useState(null);
  const [recordedMood, setRecordedMood] = useState('');
  const [moodId, setMoodId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString();
    setCurrentDate(formatDate(today));

    axios
      .get('http://localhost:3000/api/user', { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        return axios.get('http://localhost:3000/api/mood', {
          params: { user_id: res.data.user._id, date: formattedDate },
          withCredentials: true,
        });
      })
      .then((res) => {
        if (res.data && res.data.mood) {
          setRecordedMood(res.data.mood);
          setSelectedMood(res.data.mood);
          setMoodId(res.data._id);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate]);

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    handleSubmit(mood);
  };

  const handleSubmit = async (mood) => {
    if (!user) return setMessage('User not found');

    setLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const formattedDate = today.toISOString();

      const moodData = {
        user_id: user._id,
        mood,
        date: formattedDate,
      };

      const response = moodId
        ? await axios.put(`http://localhost:3000/api/mood/${moodId}`, moodData, { withCredentials: true })
        : await axios.post('http://localhost:3000/api/mood', moodData, { withCredentials: true });

      setMoodId(response.data._id);
      setRecordedMood(mood);
      setMessage(`Mood ${moodId ? 'updated' : 'recorded'} successfully: ${mood}`);
    } catch (error) {
      if (error.response?.status === 401) navigate('/login');
      else setMessage('Failed to record mood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <header className="header">
        <h1>Select Your Mood Today</h1>
        <p>{currentDate}</p>
      </header>
      <div className="mood-options">
        <div className={`mood-icon ${selectedMood === 'happy' ? 'selected' : ''}`} onClick={() => handleMoodSelect('happy')}>
          <img src="https://img.icons8.com/emoji/48/000000/smiling-face-with-heart-eyes.png" alt="happy" />
        </div>
        <div className={`mood-icon ${selectedMood === 'numb' ? 'selected' : ''}`} onClick={() => handleMoodSelect('numb')}>
          <img src="https://img.icons8.com/emoji/48/000000/expressionless-face.png" alt="numb" />
        </div>
        <div className={`mood-icon ${selectedMood === 'sad' ? 'selected' : ''}`} onClick={() => handleMoodSelect('sad')}>
          <img src="https://img.icons8.com/emoji/48/000000/crying-face.png" alt="sad" />
        </div>
      </div>
      {loading && <p>Recording...</p>}
      {message && <p className="message">{message}</p>}
    </Content>
  );
}

export default MoodTracker;
