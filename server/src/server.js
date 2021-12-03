
// Imports

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import User model from ./Models

const User = require('./Models/User');

// Declare our express server

const app = express();

// Declare the server as an export to be used in ./Routes

exports.app = app;

// Initiate cors policy so that only the client can

// make fetch requests.

app.use(cors({

    origin: 'http://localhost:3000',
    credentials: true

}));

// Allow json data and URL encoded data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Initialize passport middleware

app.use(passport.initialize());

// Use express sessions with clients

app.use(session({ 

    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false

}));

// Cookie parser middleware

app.use(cookieParser(process.env.SECRET));

// Passport session initialization

app.use(passport.session());

exports.passport = passport;

// Configuration and route imports

require('./Config/passport-config')(passport, User);

require('./Routes/userAuth');

require('./Routes/teamAuth');

require('./Routes/team');

require('./Routes/user');

// Port that the server runs on

const port = process.env.PORT || 5000;

// Connecting mongoose to MongoDB using the

// environment variable below and then starting 

// our server

mongoose.connect(process.env.MONGO_URI, 

    {   
        
        useNewUrlParser: true, 
        useUnifiedTopology: true

    }

)

.then(() => {

    // If successful, start the server

    app.listen(port);

})

.catch((err) => {

    // If not, log to the console

    console.log(err);
    
});