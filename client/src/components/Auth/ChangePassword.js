import { connect } from "react-redux";
import { mapCredentials, mapDispatch } from "../../redux/mapToProps";
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkPassword } from '../../helpers';
import axios from 'axios';

const ChangePasswordComponent = props => {

    const [currentPassword, setCurrentPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    let history = useHistory();

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('change-password-alert');

        alert.style.color = '#AA0000';

        if (newPassword !== confirmNewPassword) {

            alert.innerHTML = 'Bottom passwords must be the same';

            return;

        }

        alert.innerHTML = checkPassword(newPassword);

        if (alert.innerHTML !== '') return;

        alert.innerHTML = 'Loading...';

        axios.post('http://localhost:5000/update-user/password', {

            username: props.userInfo.username,
            currentPassword,
            newPassword

        })
        
        .then(res => {

            console.log(res);

            if (res.data.message) {

                alert.innerHTML = res.data.message;

                return;

            }

            props.userLogIn(res.data);

            history.push('/members-admin');

        });

    };

    return (

        <div className="aligned">

            <MDBCard>

                <MDBCardBody 

                    style={{
                        
                        borderStyle: 'solid', 
                        borderColor: '#CCCCCC', 
                        borderWidth: '2px',
                        boxShadow: '1px 1px 5px #CCCCCC'
                        
                    }}
                    
                >

                    <MDBCardTitle>Change Password</MDBCardTitle>

                    <form className="change-auth-form" onSubmit={e => handleSubmit(e)}>

                        <input 
                            
                            type="password" 
                            placeholder="Current Password"
                            onChange={e => setCurrentPassword(e.target.value)}
                            required
                            
                        />

                        <input 
                        
                            type="password" 
                            placeholder="New Password"
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            
                        />

                        <input 
                            
                            type="password" 
                            placeholder="Confirm New Password"
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            required
                            
                        />

                        <Button type="submit" variant="primary">Submit</Button>

                    </form>

                </MDBCardBody>

            </MDBCard>

            <br />

            <div id="change-password-alert" style={{ color: '#AA0000' }}></div>

        </div>

    );

};

const ChangePassword = connect(mapCredentials, mapDispatch)(ChangePasswordComponent);

export { ChangePassword };