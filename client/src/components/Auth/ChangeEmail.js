import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import { connect } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { checkEmail } from '../../helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ChangeEmailComponent = props => {

    const [password, setPassword] = useState('');

    const [newUsername, setNewUsername] = useState('');

    let history = useHistory();

    const handleSubmit = event => {

        event.preventDefault();

        let alert = document.getElementById('change-email-alert');

        alert.style.color = '#AA0000';

        alert.innerHTML = 'Loading...';

        if (!checkEmail(newUsername)) {

            alert.innerHTML = 'Invalid Email';

            return;

        }

        axios.post('http://localhost:5000/update-user/email', {

            username: props.userInfo.username,
            newUsername,
            password

        })
        
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;

                return;

            }

            props.userLogIn(res.data.userInfo);

            props.teamInfoUpdate(res.data.teamInfo);

            alert.style.color = '#00AA00';

            alert.innerHTML = 'Success';

            setTimeout(() => {

                history.push('/members-admin');

            }, 500);

        });

    }

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

                    <MDBCardTitle>Change Email</MDBCardTitle>

                    <form className="change-auth-form" onSubmit={e => handleSubmit(e)}>

                        <input 
                            
                            type="password" 
                            placeholder="Confirm Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            
                        />

                        <input 
                        
                            type="text" 
                            placeholder="New Email"
                            onChange={e => setNewUsername(e.target.value)}
                            required
                            
                        />

                        <Button type="submit" variant="primary">Submit</Button>

                    </form>

                </MDBCardBody>

            </MDBCard>

            <br />

            <div id="change-email-alert" style={{ color: '#AA0000' }}></div>

        </div>

    );

};

const ChangeEmail = connect(mapCredentials, mapDispatch)(ChangeEmailComponent);

export { ChangeEmail };