const app = require('../server').app;

const helpers = require('../helpers');

const Team = require('../Models/Team');

const bcrypt = require('bcrypt');

// Message displayed when an error is unknown

const errorMessage = { message: 'An unexpected error has occured' };

// Registers a new team on the db

app.post('/create-team', async (req, res) => {

    // Hash the team's password

    const hashedPassword = await helpers.hashPassword(req.body.password);

    // Shorthand variable

    const tmpObj = req.body;

    // Assign the hashed password to the team's password field

    tmpObj.password = hashedPassword;

    // New team using mongoose model

    const newTeam = new Team(tmpObj);

    // Save team

    await newTeam.save((err, team) => {

        // Error handling

        if (err) {

            // Most common mongo server error is a duplicate, which is what parseErr

            // looks for. I would just do a lambda function, but if any other errors

            // come up, I can just push them to the object in helpers.js

            if (err.name === 'MongoServerError') {

                const description = helpers.parseErr(err.code);

                return res.send(description);

            } else {

                return res.send('Unknown');

            }

        } else {

            // If no error, send team info back to be saved in redux

            res.send(team);

        }

    });

});

// Shorthand variable for readability and better design

const invalidMessage = { message: 'Team ID or password is incorrect' };

// Allows user to join a team

app.post('/team-login', async (req, res) => {

    // Find the team based on username

    Team.findOne({ username: req.body.teamUsername }, async (err, team) => {

        // Error handling

        if (err) {

            return res.send(errorMessage);
            
        }

        // If team not found, send shorthand declared above

        if (!team) {

            return res.send(invalidMessage)

        }

        // Compare password sent by user with the hashed password in the db

        bcrypt.compare(req.body.password, team.password, (err, result) => {

            // Error handling
            
            if (err) {

                return res.send(errorMessage);

            }

            // If passwords do not match, send shorthand

            if (!result)  {

                return res.send(invalidMessage);

            }

            // Else, if no error, push the user to the member 
            
            // list with the following info

            team.members.push({
                
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: 'dev'

            });

            // And finally we save the team

            team.save((err, team) => {

                // Error handling

                if (err) return res.send(errorMessage);

                // If no error, return the team info to be saved in redux

                return res.send(team);

            });

        });

    })

    .clone()

    .catch(() => {

        // More error handling

        return res.send(errorMessage);

    });

});