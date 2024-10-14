import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){

    return (
        <nav className="side-menu">
            <ul>
                <li><Link to="/" className="nav-link active">Home</Link></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
                <li><Link to="/checklist" className="nav-link">Task Checklist</Link></li>
                <li><Link to="/moodTracker" className="nav-link">Mood Tracker</Link></li>
                <li><Link to="/virtualSpaces" className="nav-link">Virtual Spaces</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;