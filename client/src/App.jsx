import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import MoodTracker from './pages/MoodTracker';
import VirtualSpaces from './pages/VirtualSpaces';
import Checklist from './pages/Checklist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Container from './components/Container';
import Navbar from './components/Navbar';

function App() {
  return (
    <Container>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/moodtracker" element={<MoodTracker />} />
          <Route path="/virtualspaces" element={<VirtualSpaces />} />
        </Routes>
    </Container>
  );
}

export default App;