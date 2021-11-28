import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TeamLoginComponent = props => {

    let history = useHistory();

    useEffect(() => {

        if (props.userInfo.teamUsername) {

            history.push('/projects-admin-pm');

        }

    }, [props, history]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
    
        event.preventDefault();

        let alert = document.getElementById('team-login-status');

        alert.innerHTML = 'Loading...';

        axios.post('http://localhost:5000/team-login', {

            teamUsername: username,
            password: password,
            username: props.userInfo.username,
            firstName: props.userInfo.firstName,
            lastName: props.userInfo.lastName

        }).then(res => {

            if (res.data.message === undefined) {

                props.teamInfoUpdate(res.data);

                axios.put('http://localhost:5000/update-user', {

                    key: 'teamUsername',
                    updateValue: username,
                    username: props.userInfo.username

                }).then(res => {

                    if (res.data.message) {

                        alert.innerHTML = res.data.message;

                    } else {

                        props.teamLogIn(res.data.teamUsername);

                        history.push('/projects-admin-pm');

                    }

                }).catch(() => {

                    alert.innerHTML = 'An unexpected error has occured';

                });

            } else {

                alert.innerHTML = res.data.message;

            }

        }).catch(() => {

            alert.innerHTML = 'An unexpected error has occured';

        });

    };

    return (

        <div>
            <div className="main-page-parent">

                <div className="login-form">

                    <form className="spaced-form" onSubmit={e => handleSubmit(e)}>

                        <div>Please enter your team's ID and password</div>

                        <p id="team-login-status"></p>

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

                    </form>

                    <Link to="/create-team" className="login-link" >Create A Team</Link>

                    <Link to="/login" className="login-link" onClick={() => props.userLogOut()}>Log Out</Link>

                </div>

            </div>

        </div>

    );
}

const TeamLogin = connect(mapCredentials, mapDispatch)(TeamLoginComponent);

export { TeamLogin };