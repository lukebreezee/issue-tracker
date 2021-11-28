import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { checkPassword, checkEmail } from '../../helpers.js';
import { connect } from 'react-redux';
import { mapDispatch, mapCredentials } from '../../redux/mapToProps';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const CreateComponent = props => {

    let history = useHistory();

    useEffect(() => {

        if (props.userInfo.username) {

            history.push('/team-login');

        }

    }, [props, history]);

    const [accountInfo, setAccountInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const [confirm, setConfirm] = useState('');

    const handleSubmit = event => {
    
        event.preventDefault();

        let alert = document.getElementById('registration-status');

        if (confirm !== accountInfo.password) {

            alert.innerHTML = 'Passwords must match.';

        } else {

            alert.innerHTML = checkPassword(accountInfo.password);
            
        }

        if (!checkEmail(accountInfo.username)) {

            alert.innerHTML = 'Email is invalid';

        }
        
        if (alert.innerHTML === '') {

            alert.innerHTML = 'Loading...';

            axios.post('http://localhost:5000/register', accountInfo)
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
                        props.userLogIn(res.data);
                        history.push('/projects-admin-pm');

                }
            }).catch(() => {

                alert.innerHTML = 'An unexpected error has occured';

            });

        }

    }

    return (

        <div className="main-page-parent">

            <div className="login-form">

                <div>Create Account</div>

                <p id="registration-status"></p>

                <br />

                <form className="login-fields" onSubmit={e => handleSubmit(e)} >

                    <div className="spaced-form">

                        <input 

                            type="text" 
                            name="firstName" 
                            onChange={e => setAccountInfo({...accountInfo, firstName: e.target.value})} 
                            placeholder="First Name" 
                            spellCheck="false" 
                            required

                        />

                        <input 

                            type="text" 
                            name="lastName" 
                            onChange={e => setAccountInfo({...accountInfo, lastName: e.target.value})} 
                            placeholder="Last Name" 
                            spellCheck="false" 
                            required

                        />

                        <input 

                            type="text" 
                            name="username" 
                            onChange={e => setAccountInfo({...accountInfo, username: e.target.value})} 
                            placeholder="Email" 
                            spellCheck="false" 
                            required

                        />

                        <input 

                            type="password" 
                            name="password" 
                            onChange={e => setAccountInfo({...accountInfo, password: e.target.value})} 
                            placeholder="Password" 
                            spellCheck="false" 
                            required

                        />

                        <input 

                            type="password" 
                            name="confirm" 
                            onChange={e => setConfirm(e.target.value)} 
                            placeholder="Confirm Password" 
                            spellCheck="false" 
                            required
                            
                        />

                    </div>

                    <br />

                    <Button type="submit" variant="primary">Submit</Button>

                </form>

                <Link to="/login" className="login-link" >Log In</Link>

            </div>

        </div>

    );

}

const Create = connect(mapCredentials, mapDispatch)(CreateComponent);

export { Create };