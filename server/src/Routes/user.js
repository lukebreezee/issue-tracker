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

app.post('/send-notification', (req, res) => {

    User.find(
        
        { teamUsername: req.body.teamUsername },

        (err, users) => {

            if (err) return res.send(errorMessage);

            if (!users) return res.send({ message: 'No users found' });

            for (let i = 0; i < users.length; i++) {

                if (req.body.memberList.indexOf(users[i].username) !== -1) {

                    users[i].notifications.push(req.body.notification);

                    users[i].markModified('notifications');

                    users[i].save(err => {

                        if (err) return res.send(errorMessage);

                    });

                }

            }

            return res.send({ message: 'Success' });

        }
        
    );

});