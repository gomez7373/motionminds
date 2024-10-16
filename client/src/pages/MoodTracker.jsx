import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(
    localStorage.getItem('selectedMood') || ''
  ); // Retrieve the selected mood from localStorage initially
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [user, setUser] = useState(null);
  const [recordedMood, setRecordedMood] = useState(
    localStorage.getItem('recordedMood') || ''
  ); // Retrieve the recorded mood from localStorage
  const navigate = useNavigate();

  // Fetch the user and recorded mood when the component mounts
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);

    // Retrieve user and mood information from API
    axios
      .get('http://localhost:3000/api/user', { withCredentials: true })
      .then((res) => {
        const { user } = res.data;
        setUser(user);

        return axios.get('http://localhost:3000/api/mood', {
          params: { user_id: user._id, date: today }, // Ensure we query today's mood
          withCredentials: true,
        });
      })
      .then((res) => {
        const { mood } = res.data;
        if (mood) {
          setRecordedMood(mood);
          setSelectedMood(mood); // Sync selected mood with recorded mood
          localStorage.setItem('recordedMood', mood); // Save to localStorage
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
      });
  }, [navigate]);

  // Handle mood selection and update the local state
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem('selectedMood', mood); // Save selected mood to localStorage
    handleSubmit(mood); // Submit the mood immediately upon selection
  };

  // Handle mood submission to the API
  const handleSubmit = async (mood) => {
    if (!user) {
      setMessage('User not found');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/mood',
        {
          user_id: user._id,
          mood: mood,
          date: new Date().toISOString(),
        },
        { withCredentials: true }
      );

      setMessage('Mood recorded successfully');
      setRecordedMood(mood); // Update recorded mood
      localStorage.setItem('recordedMood', mood); // Save to localStorage
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login if unauthorized
      } else {
        setMessage('Failed to record mood');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <header>
        <h1>Select Your Mood Today</h1>
        <p>{currentDate}</p> {/* Display current date */}
      </header>
      <div className="mood-options">
        <div
          className={`mood-icon ${selectedMood === 'happy' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('happy')}
        >
          <img src="assets/happy.png" alt="happy" />
        </div>
        <div
          className={`mood-icon ${selectedMood === 'numb' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('numb')}
        >
          <img src="assets/numb.png" alt="numb" />
        </div>
        <div
          className={`mood-icon ${selectedMood === 'sad' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('sad')}
        >
          <img src="assets/sad.png" alt="sad" />
        </div>
      </div>
      {loading && <p>Recording...</p>}
      {message && <p className="message">{message}</p>}
      {selectedMood && (
        <p className="selected-mood">Selected Mood: {selectedMood}</p>
      )}
      {recordedMood && (
        <p className="recorded-mood">Recorded Mood: {recordedMood}</p>
      )}
    </Content>
  );
}

export default MoodTracker;