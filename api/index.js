const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.route.js');

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// routes
app.use(routes);


app.get('/', (req, res) => {
	res.send("hello world");
});

mongoose.connect("mongodb+srv://7370:admin@cluster0.xqmsd.mongodb.net/motionminds?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected to database");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(() => {
    console.log("connection failed");
});