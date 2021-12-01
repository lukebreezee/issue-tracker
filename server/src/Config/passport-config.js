
// Local passport strategy for traditional username/password auth

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

// This function configures passport to our specific needs

module.exports = async (passport, User) => {

    // Using local strategy with its callback function
    
    passport.use(new LocalStrategy( async (username, password, done) => {

        // Find user in database

        User.findOne({ username: username }, (err, user) => {

            // If error then return message

            if (err) {

                return done(null, false, { message: 'Unknown' });

            }

            // If user does not exist, send message

            if (!user) return done(null, false, { message: 'User not found' });

            // Compare the hashed password with the one sent by the user

            bcrypt.compare(password, user.password, (err, result) => {

                // If error, return message

                if (err) return done(null, false, { message: 'Unknown' });

                // If passwords match, return user info

                if (result) {

                    return done(null, user);

                } else {

                    // Else, password is incorrect

                    return done(null, false, { message: 'Password Incorrect' });

                }

            });

        })

        .clone()

        .catch(err => {

            console.log(err);

        });

    }));

    // Configuration to serialize user

    passport.serializeUser((user, callback) => {

        callback(null, user.id);

    });

    //Configuration to deserialize user

    passport.deserializeUser((id, callback) => {

        // Find the user by id and call the callback
        
        User.findById(id, (err, user) => {

            callback(err, user);

        });

    });

};