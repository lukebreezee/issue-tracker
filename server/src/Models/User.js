const mongoose = require('mongoose');

// Declare schema for the user model

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

// Then declaring the model itself

const User = new mongoose.model('User', userSchema);

// And then exporting the model to be used in routes, etc

module.exports = User;