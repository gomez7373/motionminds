const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model');


const app = express();
const port = 3000;
// middleware
app.use(express.json());

//routes
//app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello from node api');
});



mongoose.connect("mongodb+srv://7370:admin@cluster0.xqmsd.mongodb.net/motionminds?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    });
})
.catch(() => {
    console.log("Connection failed");
});

// run()
async function run(){

    const user = await User.create({ name: "Jane Doe", email: "jane@mail.com", password: "password", location: "Lagos", date_of_birth: "1992-01-01" });
    console.log(user);
}