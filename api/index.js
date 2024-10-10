const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// import middleware
const isAuthenticated = require('./middleware/auth.middleware.js');
// routes imports
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const todoRoutes = require('./routes/todo.route.js');
const sessionRoutes = require('./routes/session.route.js');
const dailyRoutes = require('./routes/daily.route.js');
const feedbackRoutes = require('./routes/feedback.route.js');

// app setup
const app = express();
const port = 3000;


// use ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure views directory is set

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files if needed

// session middleware
app.use(session({
    secret: 'super+secret+key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://7370:admin@cluster0.xqmsd.mongodb.net/motionminds?retryWrites=true&w=majority&appName=Cluster0' })
}));

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(todoRoutes);
app.use(sessionRoutes);
app.use(dailyRoutes);
app.use(feedbackRoutes);

// routes
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.send('User already signed in');
    }
    res.send('Please sign in');

});

// protected route example
app.get('/protected', isAuthenticated, (req, res) => {
    res.send('This is a protected route');
});

const connect = mongoose.connect("mongodb+srv://7370:admin@cluster0.xqmsd.mongodb.net/motionminds?retryWrites=true&w=majority&appName=Cluster0");
connect.then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    });
})
.catch((err) => {
    console.log("Connection failed:", err);
});
