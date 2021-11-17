import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { checkEmail } from '../../helpers';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const GoogleRegisterComponent = props => {

    const [username, setUsername] = useState('');

    let history = useHistory();

    const handleSubmit = event => {

        event.preventDefault();

        const alert = document.getElementById('google-register-status');

        let credentials;

        if (username) {

            if (!checkEmail(username)) {

                alert.innerHTML = 'Email is invalid';
                return;

            }

            credentials = {

                ...props.googleInfo,
                username

            };

        } else {

            credentials = {...props.googleInfo};

        }

        axios.post('http://localhost:5000/oauth-client-register', {credentials})

        .then(res => {

            if (res.data.message) {
                
                alert.innerHTML = res.data.message;

                return;
            
            }

            props.userLogIn(res.data);

            history.push('/');

        });

    }

    return (

        <div className="main-page-parent">

            <div className="login-form">

                <div className="aligned">Please provide your...</div>

                <p id="google-register-status"></p>

                <br />

                <form 
                    
                    className="login-fields"
                    onSubmit={e => handleSubmit(e)}
                    
                >

                    <input

                        type="text"
                        placeholder="Work Email (If Not Gmail)"
                        onChange={e => setUsername(e.target.value)}

                    />

                    <Button variant="primary" type="submit">Submit</Button>

                </form>

            </div>

        </div>

    );

};

const GoogleRegister = connect(mapCredentials, mapDispatch)(GoogleRegisterComponent);

export { GoogleRegister };