const app = require('../server').app;

const helpers = require('../helpers');

const Team = require('../Models/Team');

const bcrypt = require('bcrypt');

const errorMessage = { message: 'An unexpected error has occured' };


app.post('/create-team', async (req, res) => {

    const hashedPassword = await helpers.hashPassword(req.body.password);

    const tmpObj = req.body;

    tmpObj.password = hashedPassword;

    const newTeam = new Team(tmpObj);

    await newTeam.save((err, team) => {

        if (err) {

            if (err.name === 'MongoServerError') {

                const description = helpers.parseErr(err.code);

                return res.send(description);

            } else {

                return res.send('Unknown');

            }

        } else {

            res.send(team);

        }

    });

});

const invalidMessage = { message: 'Team ID or password is incorrect' };

app.post('/team-login', async (req, res, done) => {

    Team.findOne({ username: req.body.teamUsername }, async (err, team) => {


        if (err) {

            return res.send(errorMessage);
            
        }

        if (!team) {

            return res.send(invalidMessage)

        }

        bcrypt.compare(req.body.password, team.password, (err, result) => {
            
            if (err) {

                return res.send(errorMessage);

            }

            if (!result)  {

                return res.send(invalidMessage);

            }

            team.members.push({
                
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: 'dev'

            });

            team.save((err, team) => {

                if (err) return res.send(errorMessage);

                return res.send(team);

            });

        });

    })
    .clone()
    .catch(() => {

        return res.send(errorMessage);

    });

});