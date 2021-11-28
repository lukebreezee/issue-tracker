import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const AccountComponent = props => {

    const [UpdateButton, setUpdateButton] = useState(null);

    let firstName = props.userInfo.firstName;

    let lastName = props.userInfo.lastName;

    let history = useHistory();

    const handleLogOut = () => {

        props.userLogOut();

        history.push('/login');

    };

    const handleTeamLogOut = async () => {

        await axios.post('http://localhost:5000/delete-member', {

            teamUsername: props.userInfo.teamUsername,
            username: props.userInfo.username

        });

        axios.put('http://localhost:5000/update-user', {

            username: props.userInfo.username,
            key: 'teamUsername',
            updateValue: null

        });

        props.teamLogOut();

        history.push('/team-login');

    }

    const updateUserInfo = () => {

        axios.post('http://localhost:5000/update-user/names', {

            username: props.userInfo.username,
            teamUsername: props.userInfo.teamUsername,
            firstName,
            lastName

        })
        
        .then(res => {

            let alert = document.getElementById('update-user-names-alert');

            if (res.message) {

                alert.style.color = '#AA0000';

                alert.innerHTML = res.message;

                return;

            }

            alert.style.color = '#00AA00';

            alert.innerHTML = 'Success';

            props.userLogIn(res.data);

        });

    };

    const UpdateButtonComponent = (

        <div id="update-button">

            <Button 
            
                id="update-button" 
                variant="outline-primary"
                onClick={() => updateUserInfo()}
                
            >
                
                Update
                
            </Button>

            <br />

            <br />

            <div id="update-user-names-alert"></div>

        </div>

    );

    const handleInfoChange = event => {

        if (event.target.name === 'firstName') {

            firstName = event.target.value;

            if (event.target.value !== props.userInfo.firstName) {

                setUpdateButton(UpdateButtonComponent);

                return;

            }

            if (lastName !== props.userInfo.lastName) {

                setUpdateButton(UpdateButtonComponent);

                return;

            }

        }

        if (event.target.name === 'lastName') {

            lastName = event.target.value;

            if (event.target.value !== props.userInfo.lastName) {

                setUpdateButton(UpdateButtonComponent);

                return;

            }

            if (firstName !== props.userInfo.firstName) {

                setUpdateButton(UpdateButtonComponent);

                return;

            }

        }

        setUpdateButton(null);

    }

    return (

        <div className="aligned">

            <div className="account-page-main-parent">

                <div></div>

                <div className="account-page-parent">

                    <h3>Edit Account</h3>

                    <div>

                        <label for="firstName"><strong>First Name:</strong></label>

                        <br />

                        <input 
                        
                            type="text"
                            name="firstName"
                            defaultValue={props.userInfo.firstName}
                            onChange={e => handleInfoChange(e)}

                        />

                        <br />

                        <div style={{height: '15px'}}></div>

                        <label for="lastName"><strong>Last Name:</strong></label>

                        <br />

                        <input 
                        
                            type="text"
                            name="lastName"
                            defaultValue={props.userInfo.lastName}
                            onChange={e => handleInfoChange(e)}

                        />

                    </div>

                    <br />

                    <div><strong>Email:</strong> {props.userInfo.username}</div>

                    <br />

                    <Button 
                    
                        variant="dark" 
                        onClick={() => history.push('/change-email')}
                        
                    >
                        
                        Change Email
                        
                    </Button>

                    <Button 
                        
                        variant="dark" 
                        onClick={() => history.push('/change-password')}
                        
                    >
                        Change Password
                        
                    </Button>

                    <Button 
                    
                        onClick={() => handleLogOut()} 
                        variant="danger"
                        
                    >
                        Log Out
                        
                    </Button>

                    <Button onClick={() => handleTeamLogOut()} variant="danger">Leave Team</Button>
                    
                </div>

                {UpdateButton}

            </div>

        </div>

    );

};

const Account = connect(mapCredentials, mapDispatch)(AccountComponent);

export { Account };