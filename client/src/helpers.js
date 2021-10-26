const checkPassword = password => {
    if (password.length < 10 || password.length > 25) {
        return 'Password must be 10-25 characters';
    }

    const capitalRegex = /[A-Z]/;
    const specialRegex = /[@#$%^&*<>?,.]/;

    let hasCapital, hasSpecial, hasNumber = false;
    
    for (let i = 0; i < password.length; i++) {
        if (capitalRegex.test(password[i])) {
            hasCapital = true;
        } else if (specialRegex.test(password[i])) {
            hasSpecial = true;
        } else if (!isNaN(password[i])) {
            hasNumber = true;
        }
    }

    if (!hasCapital) {
        return 'Password must contain a capital letter.'
    } else if (!hasSpecial) {
        return 'Password must contain a special character.';
    } else if (!hasNumber) {
        return 'Password must contain a number.';
    } else {
        return '';
    }
};

//This function is copied from https://ui.dev/validate-email-address-javascript/
const checkEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export { checkPassword, checkEmail };