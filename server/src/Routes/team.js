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