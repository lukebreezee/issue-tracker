const mongoose = require('mongoose');

// Declaring schema for a team model

const teamSchema = new mongoose.Schema({

    teamName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tickets: {type: Array, body: Object},
    projects: {type: Array, body: Object},
    members: {type: Array, body: Object}

});

// Creating model with the schema previously declared

const Team = mongoose.model('Team', teamSchema);

// And then exporting the model

module.exports = Team;