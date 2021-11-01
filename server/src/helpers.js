const bcrypt = require('bcrypt');

const expectedErrors = {
    11000: 'Duplicate'
};

const parseErr = code => {
    if (expectedErrors[code]) {
        return expectedErrors[code];
    }

    return 'Unknown';
};

const hashPassword = async password => {

    try {

        return await bcrypt.hash(password, 10);

    } catch {

        return 'Error hashing password';

    }
    
};

module.exports = {
    hashPassword: hashPassword,
    parseErr: parseErr,
};