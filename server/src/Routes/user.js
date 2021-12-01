const app = require('../server').app;

const User = require('../Models/User');

const Team = require('../Models/Team');

const bcrypt = require('bcrypt');

const hashPassword = require('../helpers').hashPassword;

// Shorthand variable for readability and better design

const errorMessage = { message: 'An unexpected error has occured' };

// Updating a user property

app.post('/update-user', (req, res) => {

    // Find user and update based on their username

    User.findOneAndUpdate(

        { username: req.body.username }, // Username sent

        { [req.body.key]: req.body.updateValue }, // Key to be updated: value to update key with

        { new: true }, // Shows updated user in callback as opposed to info from before update

        (err, user) => {

        // Error handling

        if (err) {
            
            return res.send({ message: 'An unexpected error has occured' });
        
        } else {

            // If no error, send back new user info

            return res.send(user);

        }

    })

    .clone();

});

// Specifically updates the user's first and last name

app.post('/update-user/names', (req, res) => {

    // Find user by username and update

    User.findOneAndUpdate(

        { username: req.body.username }, // Username sent in req

        { firstName: req.body.firstName, lastName: req.body.lastName }, // Update values

        { new: true }, // Show new user in callback instead of pre-update info

        (err, user) => {

            // Error handling

            if (err || !user) return res.send(errorMessage);

            // Find the user's team since it stores their first/last name

            Team.findOne({ username: req.body.teamUsername }, (err, team) => {

                // Error handling

                if (err || !team) return res.send(errorMessage);

                // Find the user's member object index

                const memberIndex = team.members.findIndex(obj =>
                    
                    obj.username === req.body.username
                    
                );

                // Create copy of team member list

                let tmp = [...team.members];

                // Update the member object to replace first and last name

                tmp[memberIndex] = {
                    
                    ...tmp[memberIndex],
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                
                }

                // Update member object to the value of the copy

                team.members[memberIndex] = tmp[memberIndex];

                // Mark the members field as modified before we save

                team.markModified('members');

                // Save the team

                team.save((err, team) => {

                    // Error handling

                    if (err || !team) return res.send(errorMessage);

                    // If no error, send back user info

                    return res.send(user);

                });
                
            });
        
        }

    );
    
});

// Updates a user's email specifically in the db (all usernames are emails)

app.post('/update-user/email', (req, res) => {

    // Find user by their username

    User.findOne({ username: req.body.username }, (err, user) => {

        // Error handling

        if (err || !user) {
            
            return res.send(errorMessage);
        
        };

        // Check for an email that is the same

        if (req.body.newUsername === user.username) return res.send({

            message: 'New email cannot be the same as your current email'

        });

        // User is prompted to confirm their password before they can submit

        // the form on the client side, so we will verify that they gave the correct password

        bcrypt.compare(req.body.password, user.password)
        
        .then(result => {

            // Handle incorrect password
            
            if (!result) return res.send({ message: 'Password is incorrect' });

            // If password is correct, we update the username

            user.username = req.body.newUsername;

            // And we mark the field as modified

            user.markModified('username');

            // Then we save the user to the db

            user.save((err, savedUser) => {

                // Error handling

                if (err || !savedUser) {
                    
                    return res.send(errorMessage);
                
                }

                // Find the user's team because it stores the user's username

                // in multiple places (members, tickets, projects)

                Team.findOne({ username: savedUser.teamUsername }, (err, team) => {

                    // Error handling

                    if (err || !team) {
                        
                        return res.send(errorMessage);
                    
                    }

                    // Create copy of member list

                    const members = [...team.members];

                    // Find user's index in member list

                    const memberIndex = members.findIndex(obj =>
                        
                        obj.username === req.body.username
                        
                    );

                    // Update specific member object to the new username

                    members[memberIndex].username = savedUser.username;

                    // Assign the copy list to the actual list

                    team.members = [...members];

                    // Tickets have member lists that contain usernames and

                    // the creator of the ticket is documented by username as well,

                    // so we must iterate through the team's tickets and replace usernames

                    // of creators and assigned members.

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

                    // Same procedure goes for projects as described with tickets

                    // above

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

                    // Mark the following fields as modified

                    team.markModified('members');

                    team.markModified('tickets');

                    team.markModified('projects');

                    // And then save the team

                    team.save((err, team) => {

                        // Error handling

                        if (err || !team) return res.send(errorMessage);

                        // If no error, send back the user info and the team info

                        // to be saved in redux

                        return res.send({

                            teamInfo: team,
                            userInfo: savedUser

                        });

                    });

                });

            });

        })

        // Error handling

        .catch(() => {
            
            return res.send(errorMessage)
        
        });
    });

});

// This updates a user's password specifically. First, the current

// password needs to be verified, then the new password needs to 

// be hashed and saved.

app.post('/update-user/password', (req, res) => {

    // We find our user

    User.findOne({ username: req.body.username }, (err, user) => {

        // Error handling

        if (err || !user) return res.send(errorMessage);

        // Compare the current password sent by the user with the hashed

        // password stored in the db

        bcrypt.compare(req.body.currentPassword, user.password)

        .then(async result => {

            // If passwords do not match, alert client

            if (!result) return res.send({ message: 'Password is incorrect' });

            // Hash the new password

            const hashedPassword = await hashPassword(req.body.newPassword);

            // Update the field

            user.password = hashedPassword;

            // Mark the field as modified

            user.markModified('password');

            // Save the user

            user.save((err, user) => {

                // Error handling

                if (err || !user) return res.send(errorMessage);

                // If no error, send back user data

                return res.send(user);

            });

        })

        // Error handling
        
        .catch(() => {

            return res.send(errorMessage);

        });

    });

});

// Pushes a notification to a list of users

app.post('/send-notification', (req, res) => {

    // Find all users that belong to the team with the username

    // sent in request body

    User.find(
        
        { teamUsername: req.body.teamUsername },

        (err, users) => {

            // Error handling

            if (err) return res.send(errorMessage);

            if (!users) return res.send({ message: 'No users found' });

            // Iterate through all users

            for (let i = 0; i < users.length; i++) {

                // If the user's username is in the list of usernames that

                // should be sent the notification...

                if (req.body.memberList.indexOf(users[i].username) !== -1) {

                    // Push the notification to their list

                    users[i].notifications.push(req.body.notification);

                    // Mark the field as modified

                    users[i].markModified('notifications');

                    // Save the user

                    users[i].save(err => {

                        // Error handling

                        if (err) return res.send(errorMessage);

                    });

                }

            }

            // If no errors, alert the client that the post was successful

            return res.send({ message: 'Success' });

        }
        
    );

});

// Sends back user info based on username

app.get('/get-user-info', (req, res) => {

    // Find User based on username

    User.findOne({ username: req.headers.username }, (err, user) => {

        // Error handling

        if (err || !user) return res.send(errorMessage);

        // If no error, send back user data

        return res.send(user);

    });

});