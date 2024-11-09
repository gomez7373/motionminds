// src/components/WelcomingSection.jsx
import React from 'react';
import './WelcomingSection.css'; // Import CSS for styling this component

// Component to display a welcoming section with images
const WelcomingSection = () => {
    return (
        <section className="welcoming-section">
            <h2>WE GOT YOUR BACK!</h2>
            <div className="welcoming-images">
                <img src="/src/assets/image1.jpg" alt="Welcoming visual 1" className="welcome-img" />
                <img src="/src/assets/image2.jpg" alt="Welcoming visual 2" className="welcome-img" />
                <img src="/src/assets/image3.jpg" alt="Welcoming visual 3" className="welcome-img" />
            </div>
        </section>
    );
};

export default WelcomingSection;
