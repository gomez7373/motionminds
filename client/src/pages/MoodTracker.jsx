import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from '../components/Content';

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
          }
        });
        setUserId(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setMessage('Failed to fetch user ID');
      }
    };

    fetchUserId();
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMessage(''); // Clear any previous messages
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      setMessage('Please select a mood.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/mood', {
        user_id: userId,
        mood: selectedMood,
        date: new Date().toISOString()
      });
      setMessage('Mood recorded successfully!');
    } catch (error) {
      console.error('Error response:', error.response.data);
      setMessage(`Error: ${error.response.data.message || 'Failed to record mood'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <header>
        <h1>Select Your Mood Today</h1>
      </header>
      <div className="mood-options">
        <img
          src="assets/happy.png"
          alt="happy"
          className={`mood-icon ${selectedMood === 'happy' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('happy')}
        />
        <img
          src="assets/numb.png"
          alt="numb"
          className={`mood-icon ${selectedMood === 'numb' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('numb')}
        />
        <img
          src="assets/sad.png"
          alt="sad"
          className={`mood-icon ${selectedMood === 'sad' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('sad')}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Recording...' : 'Record Mood'}
      </button>
      {message && <p className="message">{message}</p>}
    </Content>
  );
}

export default MoodTracker;