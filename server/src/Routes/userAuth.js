const app = require('../server').app;

const helpers = require('../helpers');

const passport = require('passport');

const User = require('../Models/User');

const Team = require('../Models/Team');

const axios = require('axios');

//Octokit is a library that makes github API requests far easier

const { Octokit } = require('@octokit/core');

// This library gives us access to environment variables (.env)

require('dotenv').config();

// Shorthand variable for ease and readability

const errorMessage = { message: 'An unexpected error has occured' }; 

// Traditional user reigster with email and password (all usernames

// are emails, they are just listed as usernames to make auth easier)

app.post('/register', async (req, res) => {

    // Hash the password sent in request body

    const hashedPassword = await helpers.hashPassword(req.body.password);

    // Create copy of request body and save the hashed password in the copy

    const tmpObj = req.body;

    tmpObj.password = hashedPassword;

    // Create new user with mongoose model

    const newUser = new User(tmpObj);

    // Save the user

    await newUser.save((err, user) => {

        // Error handling: Most common mongo error is a duplicate username,

        // so parseErr checks for that. We use a helper function instead of

        // a lambda in case other mongo errors make themselves known.

        if (err) {

            if (err.name === 'MongoServerError') {

                const description = helpers.parseErr(err.code);

                return res.send(description);

            } else {

                return res.send('Unknown');
            }

        } else {

            // If no errors, send back the user info to be saved in redux

            res.send(user);

        }

    });

});

// Authenticates the user with the passport library

app.post('/login', (req, res, next) => {

    // Use the local strategy declared in ../Config/passportConfig

    passport.authenticate('local', (err, user) => {

        // Error handling

        if (err) {

            res.send({ message: 'Unknown' });

        } else if (!user) {

            res.send({ message: 'Incorrect' });

        } else {

            // If no error, log the user in using passport's logIn method

            req.logIn(user, err => {

                if (err) {

                    res.send({ message: 'Unknown' });
                    
                }

                // And then send the user's info back to the client
    
                res.send(req.user);
    
            });

        }

    // To be honest, I have no idea why this is a multi-level function,

    // I was just following the documentation. But it works so that is what matters.

    })(req, res, next);

});

// This route is not fetched by the client, but by GitHub's API

app.get('/login/github', (req, res) => {

    // Query must have a code to send back

    if (!req.query.code) {

        return res.send({ 

            success: false,
            message: 'Error: No code'

        });

    }

    // Send back the code along with our client ID and client secret

    // which are environment variables

    axios.post('https://github.com/login/oauth/access_token', {

        headers: {

            Accept: 'application/json'

        },

        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code


    })

    .then(queryResponse => {

        // Parse the URL parameters that are sent back

        const urlParams = new URLSearchParams(queryResponse.data);

        // Error handling

        if (urlParams.get('error')) {

            return res.send({

                success: false
                
            });

        }

        // If no error, get the access token from the params

        const githubAccessToken = urlParams.get('access_token');

        // Declared our octokit to fetch data from GitHub

        const octokit = new Octokit({ auth: githubAccessToken });

        // Fetch user data

        octokit.request('GET /user')

        .then(queryResponse => {

            // Get the user's GitHub username, this is used to authenticate

            // the user in our db

            const githubUsername = queryResponse.data.login;

            // Find the user by github username

            User.findOne({ githubUsername }, (err, user) => {

                // Error handling

                if (err) return res.send({ success: false });

                // If user does not exist, they need to be registered, so

                // we redirect them to the client's github register page

                if (!user) {

                    return res.redirect(

                        `http://localhost:3000/register/github/${githubAccessToken}`

                    );

                } else {

                    // If no error and user exists, redirect to the client's

                    // github login page to be authenticated in the db

                    return res.redirect(
                        
                        `http://localhost:3000/login/github/${githubAccessToken}`
                        
                    );

                }

            });

        });

    });

});

// Registers a user with OAuth in our db (used for GitHub and Google)

app.post('/oauth-client-register', (req, res) => {

    // Get the credentials

    const { credentials } = req.body;

    // Create a new user with mongoose

    const newUser = new User(credentials);

    // Save the user

    newUser.save((err, user) => {

        // Error handling (checks for duplicate user)

        if (err) {

            if (err.code === 11000) {

                return res.send({message: 'An account already exists with this email'});

            }

            // If error is different, it is unknown
            
            return res.send(errorMessage)
        
        };

        // If no error, send back user data

        res.send(user);

    });
    
});

// Authenticates the user with their github username

app.post('/github-client-login', (req, res) => {

    // Find the user based on their github username

    User.findOne({ githubUsername: req.body.githubUsername }, (err, user) => {

        // Error handling

        if (err) return res.send(errorMessage);

        if (!user) {

            return res.send(errorMessage);
        
        }

        // If no error, send back user data

        return res.send(user);

    });

});

// Authenticates user with their google ID (provided by google's API)

app.post('/google-client-login', (req, res) => {

    // Find the user based on their googleID

    User.findOne({ googleId: req.body.googleId }, (err, user) => {

        // Error handling

        if (err) return res.send(errorMessage);

        if (!user) return res.send({ message: 'User not found' });

        // If no error, send back user data

        res.send(user);

    });

});

app.get('/demo', (req, res) => {

    let username;

    switch(req.headers.role) {

        case 'Admin':

            username = 'lamar@jackson.com';

            break;

        case 'Project Manager':

            username = 'gus@edwards.com';

            break;

        case 'Dev':

            username = 'marquise@brown.com';

            break;

        default:

            return res.send(errorMessage);

    }

    User.findOne({ username }, (err, user) => {

        if (err || !user) return res.send(errorMessage);

        return res.send(user);

    });

});

app.delete('/demo-delete', () => {

    const teamObj = JSON.parse(process.env.DEMO_TEAM);

    Team.findOne({ username: 'demo-team' }, (err, team) => {

        if (err || !team) return;

        team.tickets = teamObj.tickets;

        team.projects = teamObj.projects;

        team.members = teamObj.members;

        team.markModified('tickets');

        team.markModified('projects');

        team.markModified('members');

        team.save();

    });
    
});