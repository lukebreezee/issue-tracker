import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';

const LoginComponent = props => {

    let history = useHistory();

    useEffect(() => {
        
        if (props.userInfo.username) {

            history.push('/');

        } 

    }, [history, props]);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('login-status');

        alert.innerHTML = 'Loading...';

        axios.post('http://localhost:5000/login', {

            username,
            password

        })
        .then(res => {

            switch(res.data.message) {

                case 'Incorrect':

                    alert.innerHTML = 'Email or password is incorrect';
                    break;

                case 'Unknown':

                    alert.innerHTML = 'An unexpected error has occured';
                    break;

                default:

                    alert.innerHTML = '';
                    props.userLogIn(res.data);
                    history.push('/');

            }

        })
        .catch(err => {

            console.log(err);

            alert.innerHTML = 'An unexpected error has occured';

        });

    };

    return (

        <div className="login-parent">

            <div>Welcome, Please Login</div>

            <p id="login-status"></p>

            <div className="login-form">

                <form className="login-fields" onSubmit={e => handleSubmit(e)} >

                    <input 
                        type="text" 
                        name="username" 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="Email" 
                    />

                    <input 
                        type="password" 
                        name="password" 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Password" 
                    />

                    <input type="submit" />

                </form>

                <Link to="/create" className="login-link" >Create Account</Link>

                <Link to="/" className="login-link" >Continue as Demo User</Link>

            </div>

        </div>

    );

}

const Login = connect(mapCredentials, mapDispatch)(LoginComponent);

export { Login };