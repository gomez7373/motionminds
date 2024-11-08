import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Emanagement from './pages/Emanagement';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import MoodTracker from './pages/MoodTracker';
import VirtualSpaces from './pages/VirtualSpaces';
import DailyProgress from './pages/DailyProgress';
import Checklist from './pages/Checklist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Container from './components/Container';
import Navbar from './components/Navbar';
import Beach from './pages/Beach';
import Forest from './pages/Forest';
import Mountain from './pages/Mountain';
import Home from './pages/Home';
function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/emotionsmanagement" element={<Emanagement />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/virtualspaces" element={<VirtualSpaces />} />
        <Route path="/dailyprogress" element={<DailyProgress />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/forest" element={<Forest />} />
        <Route path="/mountain" element={<Mountain />} />
      </Routes>
    </Container>
  );
}

export default App;
