import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { mapCredentials, mapDispatch } from "../../redux/mapToProps";
import { sendNotification } from '../../helpers';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


const ViewTicketComponent = props => {

    const [comment, setComment] = useState('');

    const [newTicketStatus, setNewTicketStatus] = useState('Status');

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }

    if (!props.currentTicket) {

        history.push('/view-project');

    }

    const ticketInfo = props.teamInfo.tickets.find(obj =>
        
        obj.ticketName === props.currentTicket        
    
    );

    const creatorInfo = props.teamInfo.members.find(obj => 
                        
        obj.username === ticketInfo.creator
        
    );

    const submitComment = event => {

        event.preventDefault();

        let alert = document.getElementById('comment-alert');

        if (comment === '') {

            alert.innerHTML = 'Comment cannot be empty';
            return;

        }

        alert.innerHTML = '';

        axios.post('http://localhost:5000/ticket-comment', {

            comment: {

                body: comment,
                author: `${props.userInfo.firstName} ${props.userInfo.lastName}`

            },
            teamUsername: props.teamInfo.username,
            projectName: ticketInfo.projectName,
            ticketName: ticketInfo.ticketName

        })
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;
                return;

            }

            props.teamInfoUpdate(res.data);

            let memberList = [...ticketInfo.ticketMembers, ticketInfo.creator];

            memberList = memberList.filter(username => 

                username !== props.userInfo.username

            );

            sendNotification({
                
                type: 'NEW COMMENT',
                author: `${props.userInfo.firstName} ${props.userInfo.lastName}`,
                ticketName: ticketInfo.ticketName,
                comment,
                memberList
            
            });

            alert.innerHTML = '';

        });

    };

    const changeTicketStatus = () => {

        let alert = document.getElementById('ticket-status-alert');

        console.log(newTicketStatus);

        if (newTicketStatus === 'Status') {

            alert.innerHTML = 'Please select a new status';
            return;

        }

        if (newTicketStatus === ticketInfo.status) {

            alert.innerHTML = 'This is already the current status';
            return;

        }

        axios.post('http://localhost:5000/change-ticket-status', {

            teamUsername: props.userInfo.teamUsername,
            ticketName: ticketInfo.ticketName,
            projectName: ticketInfo.projectName,
            newStatus: newTicketStatus

        })
        
        .then(res => {

            if (res.data.message) {

                alert.innerHTML = res.data.message;
                return;

            }

            props.teamInfoUpdate(res.data);

            let memberList = [...ticketInfo.ticketMembers, ticketInfo.creator];

            memberList = memberList.filter(username => 

                username !== props.userInfo.username

            );

            sendNotification({

                type: 'TICKET STATUS CHANGE',
                memberList,
                ticketName: ticketInfo.ticketName,
                status: newTicketStatus

            });

            alert.innerHTML = '';

        });

    }

    return (

        <div>

            <h3>{ticketInfo.ticketName}</h3>

            <br />

            <div className="main-page-parent" id="view-ticket-parent">

                <div>

                    {/*
                            
                        Below is derived from react-bootstrap docs:
                    
                        https://mdbootstrap.com/docs/b5/react/components/cards/ 
                            
                    */}

                    <MDBCard >

                        <MDBCardBody 

                            style={{
                                
                                borderStyle: 'solid', 
                                borderColor: '#CCCCCC', 
                                borderWidth: '2px',
                                boxShadow: '1px 1px 5px #CCCCCC'
                                
                            }}
                            
                        >

                            <MDBCardTitle>Details</MDBCardTitle>

                            <MDBCardText>
                                
                                <ul className="card-ul">

                                    <li>Project: {ticketInfo.projectName}</li>

                                    <li>Creator: {creatorInfo.firstName} {creatorInfo.lastName}</li>

                                    <li>Priority: {ticketInfo.priority}</li>

                                    <li>Date Created: {ticketInfo.date.slice(4, 15)}</li>

                                    <li>Status: {ticketInfo.status}</li>

                                </ul>
                                
                            </MDBCardText>

                        </MDBCardBody>

                    </MDBCard>

                    <br />

                    <select onChange={e => setNewTicketStatus(e.target.value)}>

                        <option>Status</option>

                        <option>Not Started</option>

                        <option>In Progress</option>

                        <option>Finished</option>

                    </select>

                    <Button 
                    
                        variant="outline-primary" 
                        onClick={() => changeTicketStatus()}
                        style={{marginLeft: '10px', padding: '1px 3px 1px 3px'}}
                        
                    >
                        
                        Change
                        
                    </Button>

                    <br />

                    <div id="ticket-status-alert"></div>

                    <br />

                    <h5>Description:</h5>

                    <div style={{maxWidth: '300px'}}>{ticketInfo.description}</div>

                </div>
                
                <div>

                    <div className="spaced-form">

                        <h5>Comments:</h5>

                        <div className="scrolling-list-small" style={{height: '100px'}}>

                            {

                                ticketInfo.comments.map((comment, index) => {

                                    return <div key={index}>{comment.author}: "{comment.body}"</div>

                                })

                            }

                        </div>

                        <form className="spaced-form" onSubmit={e => submitComment(e)}>

                            <input 

                                type="text" 
                                placeholder="New Comment" 
                                onChange={e => setComment(e.target.value)}
                                
                            />

                            

                            <Button variant="primary" type="submit">Submit</Button>

                        </form>

                        <div id="comment-alert"></div>

                    </div>

                    <br />

                    <div>

                    <h5>Teammates On Ticket:</h5>

                    <div className="scrolling-list-small" style={{height: '100px'}}>

                        {

                            ticketInfo.ticketMembers.map((username, index) => {

                                const teamMembers = [...props.teamInfo.members];

                                const currentMember = teamMembers.find(obj => 
                                    
                                    obj.username === username
                                    
                                );

                                return (

                                    <div key={index}>
                                        
                                        {currentMember.firstName} {currentMember.lastName} ({currentMember.role})
                                        
                                    </div>

                                );

                            })

                        }

                    </div>

                </div>

                </div>

            </div>

        </div>

    );

};

const ViewTicket = connect(mapCredentials, mapDispatch)(ViewTicketComponent);

export { ViewTicket };