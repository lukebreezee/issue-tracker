const helpers = require('./helpers');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    teamUsername: String
});

const teamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tickets: {type: Array, body: Object},
    projects: {type: Array, body: Object},
    members: {type: Array, body: Object}
});

const User = mongoose.model('User', userSchema);

const Team = mongoose.model('Team', teamSchema);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(passport.initialize());

app.use(session({ 
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

app.use(cookieParser(process.env.SECRET));

app.use(passport.session());

require('./passport-config')(passport, User);

const port = process.env.PORT || 5000;

app.post('/register', async (req, res) => {
    const hashedPassword = await helpers.hashPassword(req.body.password);

    const tmpObj = req.body;

    tmpObj.password = hashedPassword;

    const newUser = new User(tmpObj);

    await newUser.save(err => {
        if (err) {
            if (err.name === 'MongoServerError') {
                const description = helpers.parseErr(err.code);
                return res.send(description);
            } else {
                return res.send('Unknown');
            }

        } else {
            res.send('Success');
        }
    });
});


app.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user) => {

        if (err) {

            res.send({ message: 'Unknown' });

        } else if (!user) {

            res.send({ message: 'Incorrect' });

        } else {

            req.logIn(user, err => {

                if (err) {

                    res.send({ message: 'Unknown' });
                    
                }
    
                res.send(req.user);
    
                console.log(req.user);
    
            });

        }

    })(req, res, next);

});

app.post('/create-team', async (req, res) => {

    const hashedPassword = await helpers.hashPassword(req.body.password);

    const tmpObj = req.body;

    tmpObj.password = hashedPassword;

    const newTeam = new Team(tmpObj);

    await newTeam.save(err => {

        if (err) {

            if (err.name === 'MongoServerError') {

                const description = helpers.parseErr(err.code);

                return res.send(description);

            } else {

                return res.send('Unknown');

            }

        } else {

            res.send('Success');

        }

    });

});

app.post('/team-login', (req, res) => {

    Team.findOne({ username: req.body.username }, async (err, team) => {

        if (err) {

            console.log(err);

            return res.send({ message: 'An unexpected error has occured' });
            
        }

        bcrypt.compare(req.body.password, team.password, (err, result) => {
            if (err) {

                console.log(err);


                return res.send({ message: 'An unexpected error has occured' });
            }

            if (result) {

                return res.send({ username: team.username });
            
            } else {

                return res.send({ message: 'Team ID or password is incorrect' });

            }

        });

    });

});

app.put('/update-user', (req, res, done) => {

    User.findOneAndUpdate(
        { username: req.body.username },
        { [req.body.key]: req.body.updateValue },
        { new: true },

        (err, user) => {

        if (err) {
            
            return res.send({ message: 'An unexpected error has occured' });
        
        } else {

            return res.send(user);

        }

    })
    .clone();

});

app.listen(port);

module.exports = {
    User: User
};