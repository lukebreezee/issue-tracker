import { useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { checkEmail } from '../../helpers';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { mapDispatch } from '../../redux/mapToProps';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Octokit } from '@octokit/core';

const GithubRegisterComponent = props => {

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [username, setUsername] = useState('');

    const { accessToken } = useParams();

    let history = useHistory();

    const handleSubmit = async event => {

        event.preventDefault();

        let alert = document.getElementById('github-register-alert');

        if (!checkEmail(username)) {

            alert.innerHTML = 'Email is invalid';
            return;

        }

        let githubUsername;

        const octokit = new Octokit({auth: accessToken});

        await octokit.request('GET /user')

        .then(res => {

            if (!res.data.login) {

                alert.innerHTML = 'An unexpected error has occured';
                return;

            }

            githubUsername = res.data.login;

        });

        axios.post('http://localhost:5000/oauth-client-register', {

            credentials: {
                
                firstName,
                lastName,
                username,
                githubUsername
                
            }

        })
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;
                return;

            }

            props.userLogIn(res.data);

            history.push('/team-login');

        });

    };


    return (

        <div className="main-page-parent">

            <div className="login-form">

                <div>Please enter the following</div>

                <p id="github-register-alert"></p>

                <br />

                <form className="login-fields" onSubmit={e => handleSubmit(e)}>

                    <div className="spaced-form">

                        <input 
                        
                            type="text"
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="First Name"
                            spellCheck="false"
                            required

                        />

                        <input 
                            
                            type="text"
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Last Name"
                            spellCheck="false"
                            required

                        />

                        <input
                            
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Work Email"
                            spellCheck="false"
                            required

                        />

                    </div>

                    <br />

                    <Button type="submit" variant="primary">

                        Submit

                    </Button>

                </form>

            </div>

        </div>

    );

};

const GithubRegisterConnected = connect(null, mapDispatch)(GithubRegisterComponent);

const GithubRegister = () => {

    return (

        <Route path="/register/github/:accessToken">

            <GithubRegisterConnected />

        </Route>

    );

};

export { GithubRegister };