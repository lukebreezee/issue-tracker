const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tickets: {type: Array, body: Object},
    projects: {type: Array, body: Object},
    members: {type: Array, body: Object}
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;