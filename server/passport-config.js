const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = async (passport, User) => {
    passport.use(new LocalStrategy( async (username, password, done) => {

        User.findOne({ username: username }, (err, user) => {

            if (err) {
                return done(null, false, { message: 'Unknown' });
            }

            if (!user) return done(null, false, { message: 'User not found' });

            bcrypt.compare(password, user.password, (err, result) => {

                if (err) return done(null, false, { message: 'Unknown' });

                if (result) {

                    return done(null, user);

                } else {

                    return done(null, false, { message: 'Password Incorrect' });

                }

            });

        })
        .clone()
        .catch(err => {
            console.log(err);
        });
    }));

    passport.serializeUser((user, callback) => {

        callback(null, user.id);

    });

    passport.deserializeUser((id, callback) => {
        
        User.findById(id, (err, user) => {

            callback(err, user);

        });

    });

};