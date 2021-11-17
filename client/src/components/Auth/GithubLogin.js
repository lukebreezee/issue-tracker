import { Route, useParams, useHistory } from 'react-router-dom';
import { Octokit } from '@octokit/core';
import { connect } from 'react-redux';
import { mapDispatch } from '../../redux/mapToProps';
import axios from 'axios';
import { useEffect } from 'react';

const GithubLoginComponent = props => {

    const { accessToken } = useParams();

    let history = useHistory();

    useEffect(() => {

        const fetchData = async () => {

            let githubUsername;

            const octokit = new Octokit({ auth: accessToken });
        
            await octokit.request('GET /user')
        
            .then(res => {
        
                console.log(`githubUsername is ${res.data.login}`);
        
                if (!res.data.login) {
                    
                    history.push('/login');
        
                    return;
                
                }
        
                githubUsername = res.data.login;
        
            });
        
            axios.post('http://localhost:5000/github-client-login', {
        
                githubUsername
        
            })
            
            .then(res => {
        
                if (res.data.message) {
        
                    history.push('/login');
        
                }
        
                props.userLogIn(res.data);
        
                history.push('/');
        
            });

        };

        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;

};

const GithubLoginConnected = connect(null, mapDispatch)(GithubLoginComponent);

const GithubLogin = () => {

    return (

        <Route path="/login/github/:accessToken">

            <GithubLoginConnected />

        </Route>

    );

};

export { GithubLogin };