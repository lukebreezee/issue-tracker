const app = require('../server').app;

const helpers = require('../helpers');

const passport = require('passport');

const User = require('../Models/User');

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