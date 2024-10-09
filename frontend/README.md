
MotionMinds Frontend

📋 Table of Contents

1. Project Overview


2. Directory Structure


3. Getting Started


4. Technologies Used


5. Features


6. How to Use


7. Future Improvements



📝 Project Overview

MotionMinds Frontend is a web-based user interface designed to help users manage their well-being through a series of tools, including a task checklist, mood tracker, and virtual spaces. The application aims to enhance personal productivity and emotional management.

This frontend is a static website built using HTML, CSS, and JavaScript, designed with a consistent, visually appealing theme and intuitive navigation.

📂 Directory Structure

motionminds/frontend/
├── assets/                 # Images and other assets
├── css/                    # Stylesheets for various pages
│   ├── base.css            # Global styles for the website
│   ├── checklist.css       # Styles for the task checklist page
│   ├── login.css           # Styles for the login page
│   ├── mood_tracker.css    # Styles for the mood tracker page
│   ├── signup.css          # Styles for the signup page
│   └── virtual_spaces.css  # Styles for the virtual spaces page
├── js/                     # JavaScript files for user interaction
│   ├── login.js            # JS logic for login functionality
│   ├── moodTracker.js      # JS logic for mood tracking
│   ├── signup.js           # JS logic for the signup form
│   ├── TaskManager.js      # JS logic for task management
│   └── virtualSpaces.js    # JS logic for interacting with virtual spaces
├── utils/                  # Utility scripts
│   └── api.js              # Placeholder for any API-related functions
├── index.html              # Main landing page
├── login.html              # Login page
├── signup.html             # Signup page
├── checklist.html          # Task checklist page
├── mood_tracker.html       # Mood tracker page
├── virtual_spaces.html     # Virtual spaces page
└── favicon.ico             # Favicon for the website

🚀 Getting Started

Prerequisites

To run the frontend locally, you need:

Node.js (for using a simple HTTP server, e.g., http-server).

Browser: Chrome, Firefox, or Edge.


Installation and Running the Project

1. Clone the repository:

git clone https://github.com/yourusername/motionminds-frontend.git
cd motionminds-frontend


2. Install http-server if you haven't done so already:

npm install -g http-server


3. Start the server:

http-server frontend


4. Open your browser and navigate to http://127.0.0.1:8080/frontend/index.html.



🛠️ Technologies Used

HTML5: Structure of the application.

CSS3: Styling for the application, ensuring a consistent, modern, and visually appealing look.

JavaScript (Vanilla JS): Adds interactivity to the pages.

Node.js and http-server: Simple HTTP server for local development.


✨ Features

Side Menu Navigation: Allows users to switch between different sections such as login, sign-up, mood tracker, checklist, and virtual spaces.

Task Checklist: Users can manage their to-do list and mark tasks as complete.

Mood Tracker: Users can select their current mood from visual icons.

Virtual Spaces: A page that allows users to explore calming virtual spaces.

Consistent Theme: A gradient background and dark theme across all pages, with a modern user interface.


📖 How to Use

1. Landing Page (index.html): This is the main entry point where users can navigate to different sections of the application using the left side menu.


2. Login (login.html): Users can log in using their credentials.


3. Sign Up (signup.html): New users can create an account.


4. Task Checklist (checklist.html): Users can manage their tasks.


5. Mood Tracker (mood_tracker.html): Allows users to track their emotions.


6. Virtual Spaces (virtual_spaces.html): Users can explore different virtual environments for relaxation.



🚧 Future Improvements

Backend Integration: Connect this frontend with a backend API for real-time data management and user authentication.

Responsive Design: Improve the responsiveness of the current CSS to ensure compatibility across various devices and screen sizes.

Enhanced Mood Tracking: Add data visualization for mood trends over time.



