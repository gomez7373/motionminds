import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css'; // Assuming any styling specific to the Navbar component

function Navbar() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="side-menu">
            <Link to="/emotionsmanagement" className="logo-link">
                <img src="/assets/logo.png" alt="MotionMinds Logo" className="navbar-logo" /> {/* Correct logo path */}
            </Link>
            <ul>
                <li>
                    <Link to="/" className="nav-link active">Home</Link>
                </li>

                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li>
                            <Link to="/updateprofile" className="nav-link">Update Profile</Link>
                        </li>
                        <li>
                            <Link to="/checklist" className="nav-link">Task Checklist</Link>
                        </li>
                        <li>
                            <Link to="/moodTracker" className="nav-link">Mood Tracker</Link>
                        </li>
                        <li>
                            <Link to="/virtualSpaces" className="nav-link">Virtual Spaces</Link>
                        </li>
                        <li>
                            <Link to="/dailyprogress" className="nav-link">Daily Progress</Link>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
