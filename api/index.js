require('dotenv').config();
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
const port = process.env.PORT || 3000;  // Use the port from the environment variable or default to 3000

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust the origin as needed
    credentials: true
}));

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { 
        maxAge: 180 * 60 * 1000,
        httpOnly: true,           // Protect from XSS attacks
        secure: false,            // Set to true if using HTTPS
     } // 3 hours
}));

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(todoRoutes);
app.use(sessionRoutes);
app.use(dailyRoutes);
app.use(moodRoutes);

// home route
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.send('User already signed in');
    }
    res.send('Please sign in');
});

// connect to the database
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
