const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('./Config/dbConfig');

const User = require('./Models/User');

const app = express();

exports.app = app;

app.use(cors({

    origin: 'http://localhost:3000',
    credentials: true

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(session({ 
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

app.use(cookieParser(process.env.SECRET));

app.use(passport.session());

require('./Config/passport-config')(passport, User);

require('./Routes/userAuth');

require('./Routes/teamAuth');

require('./Routes/team');

require('./Routes/user');

const port = process.env.PORT || 5000;

app.listen(port);