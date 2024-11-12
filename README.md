# MotionMinds #
![MotionMinds Banner](./realbannersgc.png)
## Introduction ##

. MotionMinds was created from a deep understanding of the challenges faced by individuals with disabilities. As developers who share similar experiences, we know the importance of tools that support both daily tasks and emotional well-being.

. MotionMinds is more than an app—it’s a companion designed to offer comfort, empowerment, and a sense of control.

. With tracking tools and an AR relaxation environment, our platform aims to help users feel supported and in control of their well-being. Our vision is to foster a community where challenges are met with resilience and hope.

. Our slogan is, "Unlock Your Potential, One Motion at a Time," this embodies our belief that great things can be accomplished step by step, with persistence leading to continuous improvement.

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Future Plans](#future-plans)
- [Setup and Running the App](#setup-and-running-the-app)
- [Contributors](#contributors)
- [License](#license)



# Project Overview

MotionMinds is a web application that combines productivity tools with wellness support, created specifically for individuals with disabilities. The project currently includes:

Task Management: Allows users to create, read, update, and delete tasks, filter tasks by date, and manage their completion status.

Mood Tracker: Provides a way to track moods with three options: happy, numb, and sad. This feature is designed for potential future expansion.

AR Relaxation Space: Offers a calming environment where users can de-stress through guided AR experiences.

User Authentication: Session-based authentication ensures user data is secure.

Responsive UI: Interactive elements ensure an engaging user experience.


# Technologies Used

Front-End

HTML & CSS: For building and styling the user interface.

JavaScript: For adding dynamic behaviors and user interaction.

React: For component-based UI development.


Back-End

Node.js: JavaScript runtime for server-side development.

Express.js: A minimalist framework for routing and handling HTTP requests.

MongoDB: NoSQL database for storing user data and tasks.


AR/VR

A-Frame: is a framework for building 3D and VR web experiences using simple HTML-like tags, compatible with WebXR and three.js.

WebXR: enables VR and AR experiences in browsers, supporting various devices and handling 3D rendering.

Three.js: is a JavaScript library for 3D graphics in browsers, built on WebGL and often used with A-Frame.


# Features

Current Features

Task Management:

Create, read, update, and delete user-specific tasks.

Filter tasks by date and manage completion statuses.

Bulk addition of predefined task entries.


Mood Tracker:

Track your mood with three emotion options: happy, numb, and sad.


AR Relaxation Space:

A calming space that helps users de-stress through guided AR experiences.


User Authentication:

Session-based authentication for secure user operations and data protection.


Responsive UI:

Interactive elements built with JavaScript for an engaging user experience.



Visuals

 

# Future Plans:

1. Expand AR and VR capabilities for guided motor therapy and exercise routines.

2. Develop a tracking system to monitor and analyze user progress in motor therapy with a daily score ranging from 0 to 100.

3. Implement professional crisis support features for emergency assistance with mental health providers.

4. Develop medical appointment reminders and additional health tracking systems:

5. Subdivided areas of health monitoring to cover different user needs.


6. Create a provider portal for tracking patient progress:

 - Include patient feedback notes on medication effects, marked as "positive" or "negative."

 - Add a dedicated space for patients to document specific effects they experience.


 - Add a feature for users to attach medications, track side effects, and view brief explanations of each medication's purpose and potential side effects.

7. Integrate period (menstrual) tracking and task management tools tailored for women with PMS.

8. Introduce a sleep tracker for individuals with insomnia to monitor sleep patterns and duration.

9. Explore additional health monitoring tools:

-  Hydration tracking with reminders and intake recording.

-  Enhanced mood tracking to capture daily variations and potential triggers.

-  Exercise monitoring for consistent movement and fitness.


10. Enhance accessibility features with alarms, voice commands, and audio cues for users with disabilities.

11. Develop data visualization tools for comprehensive tracking of wellness and productivity.


# Setup and Running the App

- Prerequisites

Ensure you have Node.js and npm installed.

# Running the Back-End

1. Navigate to the api/ directory:

cd path/to/motionminds/api


2. Install dependencies:

npm install


3. Run the server:

npm run dev  # For development mode



# Running the Front-End

1. Navigate to the client/ directory:

cd path/to/motionminds/client


2. Install dependencies:

npm install


3. Start the development server:

npm run dev



Example Commands for Two-Terminal Setup

# Terminal 1 (Back-End):

cd path/to/motionminds/api
npm install
npm run dev

# Terminal 2 (Front-End):

cd path/to/motionminds/client
npm install
npm run dev

Database Setup:

Ensure MongoDB is running locally or replace the connection string with a cloud-based MongoDB URI in the config.js file.

# Contributors

Sheila Gomez: Lead front-end developer using HTML, CSS, JavaScript react and procreate. Responsible for creating user interfaces, logo art and documentation.

Luis Soto: AR developer using A-Frame, WebXR and javascript (Three.js) . Developed the landing page using HTML/CSS.

Jeremy: Back-end developer using Node.js, Express.js, MongoDB and react. Collaborated on front-end integration and development.


# License

This project is licensed under the Apache License 2.0.
