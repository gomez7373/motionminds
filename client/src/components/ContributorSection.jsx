// src/components/ContributorSection.jsx
import React from 'react';
import './ContributorSection.css'; // Import CSS for styling this component

// Array of contributors with their names, images, and LinkedIn profile links
const contributors = [
    { 
        name: 'Sheila Gomez', 
        img: '/src/assets/shgo.jpg', 
        linkedin: 'https://github.com/gomez7373' 

    },
    { 
        name: 'Jeremy Cardona', 
        img: '/src/assets/jeca.jpg', 
        linkedin: 'https://www.linkedin.com/in/jeremy-cardona' 
    },
    { 

        name: 'Luis Soto', 
        img: '/src/assets/luso.jpg', 
        linkedin: 'https://www.linkedin.com/in/luis-soto-4577252bb/' 
    },
];

// Main component for displaying contributors
const ContributorSection = () => {
    return (
        <section className="contributor-section">
            <h2>Meet Our Software Engineers</h2>
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
