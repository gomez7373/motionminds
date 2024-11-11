import React, { useState, useEffect } from 'react';
import './Clock.css'; // Import the CSS for styling

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Formatting the time for a dynamic look
    const formattedTime = currentTime.toLocaleTimeString('en-US', { timeZone: 'America/Puerto_Rico' });

    return (
        <div className="clock-container">
            <div className="clock-face">
                <div className="clock-time">{formattedTime}</div>
            </div>
        </div>
    );
};

export default Clock;
