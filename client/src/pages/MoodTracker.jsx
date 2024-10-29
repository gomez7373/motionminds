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
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set to midnight
    const formattedDate = today.toISOString();  // Use ISO string for consistency
    setCurrentDate(formatDate(today)); // Set formatted date

    axios
      .get('http://localhost:3000/api/user', { withCredentials: true })
      .then((res) => {
        const { user } = res.data;
        setUser(user);
        return axios.get('http://localhost:3000/api/mood', {
          params: { user_id: user._id, date: formattedDate },
          withCredentials: true,
        });
      })
      .then((res) => {
        const { mood } = res.data;
        if (mood) {
          setRecordedMood(mood.mood);
          setSelectedMood(mood.mood);
          setMoodId(mood._id);
          localStorage.setItem('recordedMood', mood.mood);
        }
        setDataFetched(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
        setDataFetched(true);
      });
  }, [navigate]);

  // Function to format the date to MM/DD/YYYY
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMessage(`Mood selected: ${mood}`);
    localStorage.setItem('selectedMood', mood);
    handleSubmit(mood);
  };

  const handleSubmit = async (mood) => {
    if (!user) {
      setMessage('User not found');
      return;
    }
  
    setLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Set date to midnight
      const formattedDate = today.toISOString();
  
      let response;
      if (moodId) {
        response = await axios.put(
          `http://localhost:3000/api/mood/${moodId}`,
          {
            user_id: user._id,
            mood: mood,
            date: formattedDate,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          'http://localhost:3000/api/mood',
          {
            user_id: user._id,
            mood: mood,
            date: formattedDate,
          },
          { withCredentials: true }
        );
        setMoodId(response.data._id);
      }
  
      setMessage(`Mood recorded successfully: ${mood}`);
      setRecordedMood(mood);
      localStorage.setItem('recordedMood', mood);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setMessage('Failed to record mood');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <header className="header">
        <h1>Select Your Mood Today</h1>
        <p>{currentDate}</p> {/* Display formatted date */}
      </header>
      <div className="mood-options">
        <div
          className={`mood-icon ${selectedMood === 'happy' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('happy')}
        >
          <img src="https://img.icons8.com/emoji/48/000000/smiling-face-with-heart-eyes.png" alt="happy" />
        </div>
        <div
          className={`mood-icon ${selectedMood === 'numb' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('numb')}
        >
          <img src="https://img.icons8.com/emoji/48/000000/expressionless-face.png" alt="numb" />
        </div>
        <div
          className={`mood-icon ${selectedMood === 'sad' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('sad')}
        >
          <img src="https://img.icons8.com/?size=48&id=63238&format=png&color=000000" alt="sad" />
        </div>
      </div>
      {loading && <p>Recording...</p>}
      {message && <p className="message">{message}</p>}
    </Content>
  );
}

export default MoodTracker;
