const bcrypt = require('bcrypt');

// Expected MongoDB server errors to be looked for in parseErr function

// As of right now, the only expected error is a duplicate username,

// but there could be others in the future.

const expectedErrors = {

    11000: 'Duplicate'

};

// Parses a mongo server error based on its code. If code is not in

// the expected errors object above, it is unknown.

const parseErr = code => {

    if (expectedErrors[code]) {

        return expectedErrors[code];

    }

    return 'Unknown';
};

// Hashes a password using bcrypt library

const hashPassword = async password => {

    try {

        // Hashing the password ten times is secure enough

        return await bcrypt.hash(password, 10);

    } catch {

        // Error handling

        return 'Error hashing password';

    }
    
};

// Exporting our functions

module.exports = {

    hashPassword: hashPassword,
    parseErr: parseErr

};