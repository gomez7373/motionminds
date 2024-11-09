// Import React and the necessary components for the home page
import React from 'react';
import Content from '../components/Content';
import ContributorSection from '../components/ContributorSection';
import InspirationSection from '../components/InspirationSection';
import PurposeSection from '../components/PurposeSection';
import WelcomingSection from '../components/WelcomingSection';
import logo from '../../assets/logo.png'; // Import the logo directly
import './Home.css'; // Import general styles for the home page

// Main Home component
function Home() {
    return (
        <Content>
            {/* Page header */}
            <header className='header'>
            <h1 style={{ fontSize: '3.5rem' }}>Welcome</h1>
            <h1 style={{ fontSize: '3.5rem' }}>to</h1>
            <h1 style={{ fontSize: '3.5rem' }}>MotionMinds</h1>
                <h4> Unlock Your Potential, One Motion at a Time.</h4>
            </header>

            {/* Display the MotionMinds logo */}
            <img src={logo} alt="MotionMinds Logo" className="logo" />

            {/* Include the new sections */}
            
            <InspirationSection />
            <WelcomingSection />
            <PurposeSection />
            <ContributorSection />
        </Content>
    );
}

export default Home;
