const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    username: {type: String, unique: true},
    password: String,
    notifications: { type: Array, body: Object},
    teamUsername: String,
    githubUsername: { type: String, unique: true },
    googleId: { type: String, unique: true }
    
});

const User = new mongoose.model('User', userSchema);

module.exports = User;