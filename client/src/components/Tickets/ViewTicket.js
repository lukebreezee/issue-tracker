import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { mapCredentials, mapDispatch } from "../../redux/mapToProps";
import { sendNotification } from '../../helpers';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


const ViewTicketComponent = props => {

    const [comment, setComment] = useState('');

    const [newTicketStatus, setNewTicketStatus] = useState('Change Status');

    let history = useHistory();

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

        if (newTicketStatus === 'Change Status') {

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

        <div className="main-page-parent">

            <div>

                <div>Ticket Name: {ticketInfo.ticketName}</div>

                <div>Project: {ticketInfo.projectName}</div>

                <div>Creator: {creatorInfo.firstName} {creatorInfo.lastName} ({creatorInfo.role})</div>

                <div>Priority: {ticketInfo.priority}</div>

                <div>Date Created: {ticketInfo.date.slice(0, 15)}</div>

                <div>Status: {ticketInfo.status}</div>
 
                <div>Description:</div>

                <div>{ticketInfo.description}</div>

                <select onChange={e => setNewTicketStatus(e.target.value)}>

                    <option>Change Status</option>

                    <option>Not Started</option>

                    <option>In Progress</option>

                    <option>Finished</option>

                </select>

                <br />

                <Button variant="primary" onClick={() => changeTicketStatus()}>
                    
                    Submit
                    
                </Button>

                <br />

                <div id="ticket-status-alert"></div>

            </div>

            <div className="spaced-form">

                <div>Comments:</div>

                <div className="scrolling-list-small">

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

            <div>

                <div>Teammates On Ticket:</div>

                <div className="scrolling-list-small">

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

    );

};

const ViewTicket = connect(mapCredentials, mapDispatch)(ViewTicketComponent);

export { ViewTicket };