import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import Button from 'react-bootstrap/Button';
import GoogleLogin from 'react-google-login';
import { getTeamInfo } from '../../helpers';

const LoginComponent = props => {

    let history = useHistory();

    useEffect(() => {

        if (props.userInfo.username) {

            history.push('/team-login');

        }

    }, []);
    
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const googleResponseSuccess = response => {

        //TODO: CHECK FOR EXISTING ACCOUNT, IF ONE EXISTS, LOG IN. IF NOT, THE FOLLOWING CODE EXECUTES

        axios.post('http://localhost:5000/google-client-login', {

            googleId: response.profileObj.googleId

        })
        
        .then(res => {

            const message = res.data.message;

            if (message) {

                if (message !== 'User not found') {

                    document.getElementById('login-status')
                    .innerHTML = 'An unexpected error has occured';

                    return;
    
                }

                const info = response.profileObj;

                props.googleInfoUpdate({

                    googleId: info.googleId,
                    firstName: info.givenName,
                    lastName: info.familyName,
                    username: info.email

                });

                history.push('/register/google');

            } else {

                props.userLogIn(res.data);

                // console.log(props.userInfo);

                if (!props.userInfo.teamUsername) history.push('/team-login');

                history.push('/');

                // getTeamInfo()

                // .then(() => {

                //     props.logInLogOut();

                //     history.push('/');

                // })
                
                // .catch(err => {

                //     document.getElementById('login-status')
                //     .innerHTML = err.message;

                // });

            }

        });

    };

    const googleResponseFailure = () => {

        document.getElementById('login-status')
        .innerHTML = 'An unexpected error has occured';

    };

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

        <div className="main-page-parent">

            <div className="login-form">

                <div className="aligned">Welcome, Please Log In</div>

                <p id="login-status" className="aligned"></p>

                <br />

                <form className="login-fields" onSubmit={e => handleSubmit(e)} >

                    <div 

                        className="lbtn lbtn-github" 
                        id="github-button"
                        onClick={() => window.location.replace(
                            
                            'https://github.com/login/oauth/authorize?client_id=a02180673c2e4b33c2f6'
                            
                        )}

                    >

                        <i className="logo"></i>

                        <p className="label">

                            Continue With GitHub

                        </p>

                    </div>

                    {/* <div className="lbtn lbtn-google" id="google-button">

                        <i className="logo"></i>

                        <p className="label">

                            Continue With Google

                        </p>

                    </div> */}

                    <GoogleLogin 
                    
                        clientId="301612113265-5drj9s0i1l2u7tufef65d6e80a6j8pbh.apps.googleusercontent.com"
                        buttonText="Continue With Google"
                        id="google-button"
                        onSuccess={res => googleResponseSuccess(res)}
                        onFailure={() => googleResponseFailure()}
                        cookiePolicy={'single_host_origin'}

                    />

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

                    <Button variant="primary" type="submit">

                        Submit

                    </Button>

                </form>

                <br />

                <Link to="/register" >Create Account</Link>

                <Link to="/" >Continue as Demo User</Link>

            </div>

        </div>

    );

}

const Login = connect(mapCredentials, mapDispatch)(LoginComponent);

export { Login };