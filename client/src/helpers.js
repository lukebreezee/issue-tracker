import axios from 'axios';
import { store } from './redux/store';

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

const getTeamInfo = () => {

    if (!store.getState().root.userInfo.username) {

        return;

    }

    axios.post('http://localhost:5000/get-team-info', {

        teamUsername: store.getState().root.userInfo.teamUsername

    })
    .then(res => {

        store.dispatch({type: 'TEAM INFO UPDATE', teamObj: res.data});

    })
    .catch(() => {

        return 'Error';

    });

};

const updateUser = (key, updateValue, username) => {

    axios.put('http://localhost:5000/update-user', {

        key,
        updateValue,
        username

    })
    .then(res => {

        if (res.data.message) {

            return res.data.message;

        } else {

            store.dispatch({type: 'USER LOGIN', userObj: res.data});
            return 'Success';

        }

    });

};

export { checkPassword, checkEmail, getTeamInfo, updateUser };