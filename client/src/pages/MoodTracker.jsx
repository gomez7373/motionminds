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
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched
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
          setRecordedMood(mood.mood);
          setSelectedMood(mood.mood); // Sync selected mood with recorded mood
          setMoodId(mood._id); // Store the ID of the existing mood entry
          localStorage.setItem('recordedMood', mood.mood); // Save to localStorage
        }
        setDataFetched(true); // Set data fetched to true after getting response
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
        setDataFetched(true); // Set data fetched to true even if there's an error
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
      let response;
      if (moodId) {
        // Update the existing mood entry
        response = await axios.put(
          `http://localhost:3000/api/mood/${moodId}`,
          {
            user_id: user._id,
            mood: mood,
            date: new Date().toISOString(),
          },
          { withCredentials: true }
        );
      } else {
        // Create a new mood entry
        response = await axios.post(
          'http://localhost:3000/api/mood',
          {
            user_id: user._id,
            mood: mood,
            date: new Date().toISOString(),
          },
          { withCredentials: true }
        );
        setMoodId(response.data._id); // Store the ID of the new mood entry
      }

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
      {dataFetched && selectedMood && (
        <p className="selected-mood">Selected Mood: {selectedMood}</p>
      )}
      {dataFetched && recordedMood && (
        <p className="recorded-mood">Recorded Mood: {recordedMood}</p>
      )}
    </Content>
  );
}

export default MoodTracker;