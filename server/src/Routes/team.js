const app = require('../server').app;

const Team  = require('../Models/Team');

// Error message to be displayed whenever error is unknown

const errorMessage = { message: 'An unexpected error has occured' };

// Serves team info from the given username

app.post('/get-team-info', (req, res) => {

    // We find the team

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        // Error handling

        if (err) return err;

        // If no error, send back the team info

        res.send(team);

    });

});

// Deletes member from a specific team

app.post('/delete-member', (req, res) => {

    // Find the team

    Team.findOne({ username: req.body.teamUsername }, (err, team) => {

        // Error handling

        if (err) return res.send(errorMessage);

        // Create copy of members list

        const tmp = [...team.members];

        // Find user's index in member list

        const objIndex = tmp.findIndex(elem => 
            
            elem.username === req.body.username
            
        );

        // Remove user

        tmp.splice(objIndex, 1);

        // Set member list to temporary variable

        team.members = tmp;

        // Save the team

        team.save(err => {

            // Error handling

            if (err) return res.send(errorMessage);

            // If no error, just return a message indicating success

            return res.send({ message: 'Success' });

        });

    });
    
});

// Changes a user's role on a team

app.post('/assign-role', (req, res) => {

    // Find the team from the username

    Team.findOne({ username: req.body.teamUsername }, (err, team) => {

        // Error handling

        if (err) return res.send(errorMessage);

        // Create copy of members list

        let tmp = [...team.members];

        // Find user's index in the list so that we can edit

        let memberIndex = tmp.findIndex(obj => 
            
            obj.username === req.body.username
            
        );

        // Member's role is changed to that of the request parameter

        tmp[memberIndex].role = req.body.role;

        // Assign the member list to the copy

        team.members = [...tmp];

        // Mark the members field as modified

        team.markModified('members');

        // And then save the team

        team.save(err => {

            // Error handling

            if (err) return res.send(errorMessage);

            // If no error, return success message

            return res.send({ message: 'Success' });

        });

    });
    
});

// Declare a new project and push to the team's project list

app.post('/create-project', (req, res) => {

    // Find the team based on username

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        // Error handling

        if (err) return res.send(errorMessage);

        // See if a project already exists with the same name

        const projectIndex = team.projects.findIndex(obj => 
            
            obj.projectName === req.body.projectInfo.projectName
            
        );

        // If so, do not allow this project to be created and alert user

        if (projectIndex !== -1) {

            return res.send({ message: 'A project already exists with this name' });

        }

        // Push the project to the list

        team.projects.push(req.body.projectInfo);

        // Mark the team as modified

        team.markModified();

        // Save the team

        team.save((err, team) => {

            // Error handling

            if (err) res.send(errorMessage);

            // If no error, send back the team info to be cached

            res.send(team);

        });

    });

});

// Saves a new ticke to the db

app.post('/new-ticket', (req, res) => {

    // Find the team based on username

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        // Error handling

        if (err) return res.send(errorMessage);

        // Try to find a ticket on the project name given that

        // already exists with provided name

        const ticketIndex = team.tickets.findIndex(obj => 

            obj.projectName === req.body.ticketInfo.projectName

            && obj.ticketName === req.body.ticketInfo.ticketName

        );

        // If there exists such a ticket, alert user and return

        if (ticketIndex !== -1) {

            return res.send({ message: 'This project already has a ticket with that name'});

        }

        // Push the new ticket to the team's list

        team.tickets.push(req.body.ticketInfo);

        // Mark the team as modified

        team.markModified();

        // Save the team

        team.save((err, team) => {

            // Error handling

            if (err) return res.send(errorMessage);

            // If no error, return the team info to be saved

            return res.send(team);

        });

    });

});

// Stores a new comment made on a ticket

app.post('/ticket-comment', (req, res) => {

    // Find the team based on username

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        // Error handling

        if (err) return res.send(errorMessage);

        // Make copy of ticket list

        const tickets = [...team.tickets];

        // Find index of ticket in list

        const ticketIndex = tickets.findIndex(obj => 
            
            obj.ticketName === req.body.ticketName
            && obj.projectName === req.body.projectName
            
        );

        // Push comment to the 'comments' field in the existing ticket

        tickets[ticketIndex].comments.push(req.body.comment);

        // Replace the ticket object that is stored on the db with the copy

        team.tickets[ticketIndex] = tickets[ticketIndex];

        // Save the team

        team.save((err, team) => {

            // Error handling

            if (err) return res.send(errorMessage);

            // If no error, return the team's info to be saved

            return res.send(team);

        });

    });

});

// Handles a ticket status change

app.post('/change-ticket-status', (req, res) => {

    // Find the team based on username

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        // Error handling

        if (err || !team) return res.send(errorMessage);

        // Make copy of ticket list

        const tickets = [...team.tickets];

        // Find index of subject ticket

        const ticketIndex = tickets.findIndex(obj => 
            
            obj.ticketName === req.body.ticketName
            && obj.projectName === req.body.projectName
            
        );

        // Change status to that of the request field

        tickets[ticketIndex].status = req.body.newStatus;

        // Update the team's ticket to be the value of its copy

        team.tickets[ticketIndex] = tickets[ticketIndex];

        // Mark the tickets field as modified

        team.markModified('tickets');

        // Save the team

        team.save(err => {

            // Error handling

            if (err) return res.send(errorMessage);

            // If no error, return the team info to be saved

            return res.send(team);

        });

    });

});