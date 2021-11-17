import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AccountComponent = props => {

    let history = useHistory();

    const handleLogOut = () => {

        props.userLogOut();

        history.push('/login');

    };

    const handleTeamLogOut = async () => {

        await axios.post('http://localhost:5000/delete-member', {

            teamUsername: props.userInfo.teamUsername,
            username: props.userInfo.username

        });

        axios.put('http://localhost:5000/update-user', {

            username: props.userInfo.username,
            key: 'teamUsername',
            updateValue: null

        });

        props.teamLogOut();

        history.push('/team-login');

    }

    const sendNotification = () => {

        let memberList = props.teamInfo.members.map(member => {

            return member.username;

        });

        axios.post('http://localhost:5000/send-notification', {

            teamUsername: props.userInfo.teamUsername,
            memberList,
            notification: 'You have been pushed a notification'

        })
        
        .then(res => {

            console.log(res);

        });

    }

    return (

        <div className="aligned">
            
            <div>Account</div>

            <button onClick={() => handleLogOut()}>Log Out</button>

            <button onClick={() => handleTeamLogOut()}>Leave Team</button>

            <button onClick={() => sendNotification()}>Send Notification</button>
            
        </div>

    );

};

const Account = connect(mapCredentials, mapDispatch)(AccountComponent);

export { Account };