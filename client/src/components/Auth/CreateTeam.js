import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkPassword, updateUser } from '../../helpers';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const CreateTeamComponent = props => {

    let history = useHistory();

    useEffect(() => {

        if (props.userInfo.teamUsername) {

            history.push('/projects-admin-pm');

        }

    }, [props, history]);

    const [teamName, setTeamName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('create-team-status');

        if (teamName.length > 20) {
            alert.innerHTML = 'Team name cannot be more than 20 characters';
            return;
        }

        if (username.length > 15) {
            alert.innerHTML = 'Team ID cannot be more than 15 characters';
            return;
        }

        if (/\s/.test(username)) {
            alert.innerHTML = 'Team ID cannot contain a space';
            return;
        }

        alert.innerHTML = checkPassword(password);

        if (alert.innerHTML !== '') return;

        alert.innerHTML = 'Loading...';

        axios.post('http://localhost:5000/create-team', {

            teamName: teamName,
            username: username,
            password: password,
            members: [

                {
                    username: props.userInfo.username,
                    role: 'admin',
                    firstName: props.userInfo.firstName,
                    lastName: props.userInfo.lastName
                }

            ]

        })
        .then(res => {

            switch(res.data) {

                case 'Unknown':

                    alert.innerHTML = 'An unexpected error has occured';
                    break;

                case 'Duplicate':

                    alert.innerHTML = 'A team with this ID already exists';
                    break;


                default:

                    alert.innerHTML = '';
                    props.teamInfoUpdate(res.data);
                    props.teamLogIn(res.data.username);
                    updateUser('teamUsername', res.data.username, props.userInfo.username);
                    history.push('/projects-admin-pm');

            }
        })
        .catch(() => {
            alert.innerHTML = 'An unexpected error has occured';
        });

    }

    return (

        <div className="main-page-parent">

            <form className="spaced-form" onSubmit={e => handleSubmit(e)}>

                <div>Create Team</div>

                <p id="create-team-status"></p>

                <input 
                    type="text" 
                    name="teamName" 
                    placeholder="Team Name" 
                    onChange={e => setTeamName(e.target.value)}
                    required
                />

                <input 
                    type="text" 
                    name="username" 
                    placeholder="Team ID"
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" variant="primary">Submit</Button>

                <Link to="/team-login" className="login-link" >Back to team login</Link>

            </form>

        </div>

    );

};

const CreateTeam = connect(mapCredentials, mapDispatch)(CreateTeamComponent);

export { CreateTeam };