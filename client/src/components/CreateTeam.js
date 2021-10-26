import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkPassword } from '../helpers';
import { useHistory } from 'react-router-dom';
import { mapCredentials } from '../redux/mapToProps';
import { connect } from 'react-redux';
import { store } from '../redux/store';
import axios from 'axios';

const CreateTeamComponent = props => {

    let history = useHistory();

    useEffect(() => {
        
        if (!props.userInfo.username) {

            history.push('/login');

        }

    }, [history, props]);

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
            password: password
        })
        .then(res => {

            switch(res.data) {

                case 'Unknown':
                    alert.innerHTML = 'An unexpected error has occured';
                    break;

                case 'Duplicate':
                    alert.innerHTML = 'An account with this email address already exists';
                    break;

                default:
                    alert.innerHTML = '';
                    store.dispatch({ type: 'USER LOGIN', username: username });
                    break;
                    //Give the user access to the rest of the site and their account
            }
        })
        .catch(() => {
            alert.innerHTML = 'An unexpected error has occured';
        });

    }

    return (

        <div>
            <div className="login-parent">

                <div>Create Team</div>

                <p id="create-team-status"></p>

                <div className="login-form">

                    <form className="login-fields" onSubmit={e => handleSubmit(e)}>

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

                        <input type="submit" />

                    </form>

                    <Link to="/team-login" className="login-link" >Back to team login</Link>

                </div>

            </div>

        </div>

    );

};

const CreateTeam = connect(mapCredentials)(CreateTeamComponent);

export { CreateTeam };