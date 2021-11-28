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

    return new Promise ((resolve, reject) => {

        if (!store.getState().root.userInfo.username) {

            return reject({ message: 'User not logged in' });
    
        }
    
        axios.post('http://localhost:5000/get-team-info', {
    
            teamUsername: store.getState().root.userInfo.teamUsername
    
        })

        .then(res => {
    
            store.dispatch({type: 'TEAM INFO UPDATE', teamObj: res.data});

            return resolve(res.data);
    
        })

        .catch(() => {
    
            return reject('An unexpected error has occured');
    
        });

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

const sendNotification = params => {

    let notification;

    const userInfo = store.getState().root.userInfo;

    const first = userInfo.firstName;

    const last = userInfo.lastName;

    switch(params.type) {

        case 'NEW PROJECT':

            notification = 
                
                `${first} ${last} has added you to a project: ${params.name}`;

            break;

        case 'NEW TICKET':

            notification = `You have been assigned a new ticket on: ${params.projectName}`;

            break;

        case 'NEW COMMENT':

            notification = 
            
                `${params.author} has made a comment on "${params.ticketName}": "${params.comment}"`;

            break;

        case 'TICKET STATUS CHANGE':

            notification = 
            
                `${first} ${last} has changed the status of "${params.ticketName}" to "${params.status}"`;

            break;

        default:

            break;

    }

    axios.post('http://localhost:5000/send-notification', {

        teamUsername: userInfo.teamUsername,
        memberList: params.memberList,
        notification

    });

};



export { 
    
    checkPassword, 
    checkEmail, 
    getTeamInfo, 
    updateUser,
    sendNotification

};