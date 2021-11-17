const app = require('../server').app;

const helpers = require('../helpers');

const passport = require('passport');

const User = require('../Models/User');

const axios = require('axios');

//Octokit is a library that makes github API requests far easier
const { Octokit } = require('@octokit/core');

require('dotenv').config();

const errorMessage = { message: 'An unexpected error has occured' }; 

app.post('/register', async (req, res) => {

    const hashedPassword = await helpers.hashPassword(req.body.password);

    const tmpObj = req.body;

    tmpObj.password = hashedPassword;

    const newUser = new User(tmpObj);

    await newUser.save((err, user) => {

        if (err) {

            if (err.name === 'MongoServerError') {

                const description = helpers.parseErr(err.code);

                return res.send(description);

            } else {

                return res.send('Unknown');
            }

        } else {

            res.send(user);

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
    
            });

        }

    })(req, res, next);

});

app.get('/login/github', (req, res) => {

    if (!req.query.code) {

        return res.send({ 

            success: false,
            message: 'Error: No code'

        });

    }

    axios.post('https://github.com/login/oauth/access_token', {

        headers: {

            Accept: 'application/json'

        },

        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code


    })
    .then(queryResponse => {

        const urlParams = new URLSearchParams(queryResponse.data);

        if (urlParams.get('error')) {

            return res.send({

                success: false
                
            });

        }

        const githubAccessToken = urlParams.get('access_token');

        const octokit = new Octokit({ auth: githubAccessToken });

        octokit.request('GET /user')

        .then(queryResponse => {

            const githubUsername = queryResponse.data.login;

            User.findOne({ githubUsername }, (err, user) => {

                if (err) return res.send({ success: false });

                if (!user) {

                    return res.redirect(

                        `http://localhost:3000/register/github/${githubAccessToken}`

                    );

                } else {

                    return res.redirect(
                        
                        `http://localhost:3000/login/github/${githubAccessToken}`
                        
                    );

                }

            });

        });

    });

});

app.post('/oauth-client-register', (req, res) => {

    const { credentials } = req.body;

    const newUser = new User(credentials);

    newUser.save((err, user) => {

        if (err) {

            if (err.code === 11000) {

                return res.send({message: 'An account already exists with this email'});

            }
            
            return res.send(errorMessage)
        
        };

        res.send(user);

    });
    
});

app.post('/github-client-login', (req, res) => {

    User.findOne({ githubUsername: req.body.githubUsername }, (err, user) => {

        if (err) return res.send(errorMessage);

        if (!user) {
            return res.send(errorMessage);
        
        }

        return res.send(user);

    });

});

app.post('/google-client-login', (req, res) => {

    User.findOne({ googleId: req.body.googleId }, (err, user) => {

        if (err) return res.send(errorMessage);

        if (!user) return res.send({ message: 'User not found' });

        res.send(user);

    });

});