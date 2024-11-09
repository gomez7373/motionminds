// src/components/ContributorSection.jsx
import React from 'react';
import './ContributorSection.css'; // Import CSS for styling this component

// Array of contributors with their names, images, and LinkedIn profile links
const contributors = [
    { 
        name: 'luso', 
        img: '/src/assets/luso.jpg', 
        linkedin: 'https://www.linkedin.com/in/luso-profile' 
    },
    { 
        name: 'shgo', 
        img: '/src/assets/shgo.jpg', 
        linkedin: 'https://www.linkedin.com/in/shgo-profile' 
    },
    { 
        name: 'jeca', 
        img: '/src/assets/jeca.jpg', 
        linkedin: 'https://www.linkedin.com/in/jeca-profile' 
    },
];

// Main component for displaying contributors
const ContributorSection = () => {
    return (
        <section className="contributor-section">
            <h2>Meet Our Contributors</h2>
            <div className="contributor-list">
                {contributors.map((contributor, index) => (
                    <div key={index} className="contributor-card">
                        <img 
                            src={contributor.img} 
                            alt={contributor.name} 
                            className="contributor-img" 
                        />
                        {/* Button that links to the contributor's LinkedIn profile */}
                        <button 
                            className="contributor-name-button"
                            onClick={() => window.open(contributor.linkedin, '_blank')}
                        >
                            {contributor.name}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContributorSection;
