import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { checkPassword, checkEmail } from '../helpers.js';
import axios from 'axios';

const Create = () => {

    let history = useHistory();

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
                        history.push('/');
                        //Give the user access to the rest of the site and their account

                }
            }).catch(() => {

                alert.innerHTML = 'An unexpected error has occured';

            });

        }

    }

    return (

        <div className="login-parent">

            <div>Create Account</div>

            <p id="registration-status"></p>

            <div className="login-form">

                <form className="login-fields" onSubmit={e => handleSubmit(e)} >

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

                    <input type="submit" />

                </form>

            </div>

            <Link to="/login" className="login-link" >Log In</Link>

        </div>

    );

}

export { Create };