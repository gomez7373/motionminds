import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the path if necessary

// Ensure the root element exists in your HTML file.
const rootElement = document.getElementById('root');

createRoot(rootElement).render(

    <AuthProvider> {/* Provide authentication context to the app */}
      <BrowserRouter> {/* Enable routing throughout the app */}
        <App />
      </BrowserRouter>
    </AuthProvider>
);
