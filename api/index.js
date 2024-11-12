// Load environment variables from .env file
require('dotenv').config();
console.log('Mongo URI:', process.env.MONGO_URI); // Debug line to ensure MONGO_URI is loaded

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// import middleware
const isAuthenticated = require('./middleware/auth.middleware.js');

// routes imports
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const todoRoutes = require('./routes/todo.route.js');
const sessionRoutes = require('./routes/session.route.js');
const dailyRoutes = require('./routes/daily.route.js');
const moodRoutes = require('./routes/mood.route.js');

// app setup
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust the origin as needed
    credentials: true
}));

// session middleware with enhanced error handling
try {
    const mongoStore = MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Use environment variable for MongoDB URI
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } // Optional, only if needed
    });

    app.use(session({
        secret: process.env.SESSION_SECRET || 'fallback-secret-key', // Use environment variable or fallback
        resave: false,
        saveUninitialized: true,
        store: mongoStore,
        cookie: { 
            maxAge: 180 * 60 * 1000, // 3 hours
            httpOnly: true,          // Protect from XSS attacks
            secure: false            // Set to true if using HTTPS
        }
    }));
} catch (error) {
    console.error('Failed to initialize session store:', error);
}

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(todoRoutes);
app.use(sessionRoutes);
app.use(dailyRoutes);
app.use(moodRoutes);

// default route
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.send('User already signed in');
    }
    res.send('Please sign in');
});

// Connect to MongoDB using the environment variable (no deprecated options needed)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        });
    })
    .catch((err) => {
        console.log("Connection failed:", err);
    });
