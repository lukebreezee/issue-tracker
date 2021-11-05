const app = require('../server').app;

const Team  = require('../Models/Team');

const errorMessage = { message: 'An unexpected error has occured' };

app.post('/get-team-info', (req, res) => {

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        if (err) return err;

        res.send(team);

    });

});

app.post('/delete-member', (req, res) => {

    Team.findOne({ username: req.body.teamUsername }, (err, team) => {

        if (err) return res.send(errorMessage);

        const tmp = [...team.members];

        const objIndex = tmp.findIndex(elem => 
            
            elem.username === req.body.username
            
        );

        tmp.splice(objIndex, 1);

        team.members = tmp;

        team.save(err => {

            if (err) return res.send(errorMessage);

            return res.send({ message: 'Success' });

        });

    });
    
});

app.post('/assign-role', (req, res) => {

    Team.findOne({ username: req.body.teamUsername }, (err, team) => {

        if (err) return res.send(errorMessage);

        let tmp = [...team.members];

        let memberIndex = tmp.findIndex(obj => 
            
            obj.username === req.body.username
            
        );

        tmp[memberIndex].role = req.body.role;

        team.members = [...tmp];

        team.markModified('members');

        team.save((err, team) => {

            if (err) return res.send(errorMessage);

            return res.send({ message: 'Success' });

        });

    });
    
});

app.post('/create-project', (req, res) => {

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        if (err) return res.send(errorMessage);

        const projectIndex = team.projects.findIndex(obj => 
            
            obj.projectName === req.body.projectInfo.projectName
            
        );

        if (projectIndex !== -1) {

            return res.send({ message: 'A project already exists with this name' });

        }

        team.projects.push(req.body.projectInfo);

        team.markModified();

        team.save((err, team) => {

            if (err) res.send(errorMessage);

            res.send(team);

        });

    });

});

app.post('/new-ticket', (req, res) => {

    Team.findOne({username: req.body.teamUsername}, (err, team) => {

        if (err) return res.send(errorMessage);

        const ticketIndex = team.tickets.findIndex(obj => 

            obj.projectName === req.body.ticketInfo.projectName

            && obj.ticketName === req.body.ticketInfo.ticketName

        );

        if (ticketIndex !== -1) {

            return res.send({ message: 'This project already has a ticket with that name'});

        }

        team.tickets.push(req.body.ticketInfo);

        team.markModified();

        team.save((err, team) => {

            if (err) return res.send(errorMessage);

            return res.send(team);

        });

    });

});