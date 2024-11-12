// src/components/PurposeSection.jsx
import React from 'react';
import './PurposeSection.css'; // Import CSS for styling this component

// Component to display the purpose section
const PurposeSection = () => {
    return (
        <section className="purpose-section">
            <h2>Purpose of the App</h2>
            <p>
                    MotionMinds is a companion app for task management, mood tracking, and relaxation,
                 empowering individuals with disabilities to manage tasks efficiently while enhancing 
                 well-being. With an intuitive, user-friendly interface, it fosters a supportive 
                 environment where users feel in control. Our mission is to innovate and improve 
                 continuously, ensuring accessibility,inclusivity, and a positive user experience.
            </p>
        </section>
    );
};

export default PurposeSection;
