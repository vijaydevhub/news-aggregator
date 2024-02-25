const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const {signup} = require('./src/controllers/user.js');
const {login} = require('./src/controllers/user.js');
const {userpreference} = require('./src/controllers/user.js');
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const redis = require('redis');
require('dotenv').config();


try {
    mongoose.connect("mongodb://localhost:27017/usersdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
} catch (error) {
    console.log("Connection to the DB failed");
    console.log(error);
}


app.get("/", (req, res) => {
    return res.status(200).send("Hello World")
})

app.post("/login", login)

app.post("/register", signup)

app.get("/userpreference", userpreference)

app.patch("/userpreference", userpreference)


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;