const app = require('../server').app;

const User = require('../Models/User');

app.put('/update-user', (req, res) => {

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