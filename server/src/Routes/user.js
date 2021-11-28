const app = require('../server').app;

const User = require('../Models/User');

const Team = require('../Models/Team');

const bcrypt = require('bcrypt');

const hashPassword = require('../helpers').hashPassword;

const errorMessage = { message: 'An unexpected error has occured' };

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

app.post('/update-user/names', (req, res) => {

    User.findOneAndUpdate(

        { username: req.body.username },

        { firstName: req.body.firstName, lastName: req.body.lastName },

        { new: true },

        (err, user) => {

            if (err || !user) return res.send(errorMessage);

            Team.findOne({ username: req.body.teamUsername }, (err, team) => {

                if (err || !team) return res.send(errorMessage);

                const memberIndex = team.members.findIndex(obj =>
                    
                    obj.username === req.body.username
                    
                );

                let tmp = [...team.members];

                tmp[memberIndex] = {
                    
                    ...tmp[memberIndex],
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                
                }

                team.members[memberIndex] = tmp[memberIndex];

                team.markModified('members');

                team.save((err, team) => {

                    if (err || !team) return res.send(errorMessage);

                    return res.send(user);

                });
                
            });
        
        }

    );
    
});

app.post('/update-user/email', (req, res) => {

    User.findOne({ username: req.body.username }, (err, user) => {

        if (err || !user) {

            console.log('One');

            console.log(err);
            
            return res.send(errorMessage);
        
        };

        if (req.body.newUsername === user.username) return res.send({

            message: 'New email cannot be the same as your current email'

        });

        bcrypt.compare(req.body.password, user.password)
        
        .then(result => {
            
            if (!result) return res.send({ message: 'Password is incorrect' });

            user.username = req.body.newUsername;

            user.markModified('username');

            user.save((err, savedUser) => {

                if (err || !savedUser) {
                    
                    return res.send(errorMessage);
                
                }

                Team.findOne({ username: savedUser.teamUsername }, (err, team) => {

                    if (err || !team) {
                        
                        return res.send(errorMessage);
                    
                    }

                    const members = [...team.members];

                    const memberIndex = members.findIndex(obj =>
                        
                        obj.username === req.body.username
                        
                    );

                    members[memberIndex].username = savedUser.username;

                    team.members = [...members];

                    team.tickets = team.tickets.map(obj => {

                        if (obj.creator === req.body.username) {

                            obj.creator = savedUser.username;

                        }

                        obj.ticketMembers = obj.ticketMembers.map(username => {

                            if (username === req.body.username) {

                                username = savedUser.username;

                            }

                            return username;

                        });

                        return obj;

                    });

                    team.projects = team.projects.map(obj => {

                        if (obj.creator === req.body.username) {

                            obj.creator = savedUser.username;

                        }

                        obj.selectedMembers = obj.selectedMembers.map(username => {

                            if (username === req.body.username) {

                                username = savedUser.username;

                            }

                            return username;

                        });

                        return obj;

                    });

                    team.markModified('members', 'tickets', 'projects');

                    team.save((err, team) => {

                        if (err || !team) return res.send(errorMessage);

                        return res.send({

                            teamInfo: team,
                            userInfo: savedUser

                        });

                    });

                });

            });

        })

        .catch(() => {
            
            return res.send(errorMessage)
        
        });
    });

});

app.post('/update-user/password', (req, res) => {

    User.findOne({ username: req.body.username }, (err, user) => {

        if (err || !user) return res.send(errorMessage);

        bcrypt.compare(req.body.currentPassword, user.password)

        .then(async result => {

            if (!result) return res.send({ message: 'Password is incorrect' });

            const hashedPassword = await hashPassword(req.body.newPassword);

            user.password = hashedPassword;

            user.markModified('password');

            user.save((err, user) => {

                if (err || !user) return res.send(errorMessage);

                return res.send(user);

            });

        })
        
        .catch(() => {

            return res.send(errorMessage);

        });

    });

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