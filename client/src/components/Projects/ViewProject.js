import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

const ViewProjectComponent = props => {

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }

    if (!props.currentProject) {

        history.push('/projects-admin-pm');
        return null;

    }

    const projectInfo = props.teamInfo.projects.find(obj => 
        
        obj.projectName === props.currentProject
        
    );

    const creatorInfo = props.teamInfo.members.find(obj => 
                        
        obj.username === projectInfo.creator
        
    );

    let newTicket;

    if (projectInfo.creator === props.userInfo.username) {

        newTicket = (

            <div>

                <Button 
                
                    onClick={() => history.push('/new-ticket')} 
                    variant="primary"
                    style={{width: '100%'}}
                    
                >
                    
                    New Ticket
                    
                </Button>

            </div>

        );

    } else {

        newTicket = null;

    }

    const handleClick = ticketName => {

        props.currentTicketUpdate(ticketName);

        history.push('/view-ticket');

    }

    return (

        <div>

            <h3>{projectInfo.projectName}</h3>

            <br />

            <div className="main-page-parent">

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
                                
                            }}>

                            <MDBCardTitle>Details</MDBCardTitle>

                            <MDBCardText>
                                
                                <ul className="card-ul">

                                    <li>Date Created: {projectInfo.date.slice(4, 15)}</li>

                                    <li>Creator: {creatorInfo.firstName} {creatorInfo.lastName}</li>

                                    <li>Priority: {projectInfo.priority}</li>

                                </ul>
                                
                            </MDBCardText>

                        </MDBCardBody>

                    </MDBCard>

                    <br />

                    <h6>Teammates On Project:</h6>

                    <div className="scrolling-list-small" style={{height: '100px'}}>

                        {

                            projectInfo.selectedMembers.map((username, index) => {

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

                    <div>

                    <h6>Tickets For This Project:</h6>

                    <div className="scrolling-list-small" style={{height: '120px'}}>

                        {

                            props.teamInfo.tickets.map((obj, index) => {

                                if (obj.projectName === projectInfo.projectName) {

                                    return (
                                    
                                        <div 

                                            key={index}
                                            onClick={() => handleClick(obj.ticketName)}
                                            
                                        >
                                            {obj.ticketName}
                                            
                                        </div>
                                        
                                    );

                                } else {

                                    return null;

                                }

                            })

                        }

                    </div>

                    <br />

                    {

                        newTicket

                    }

                    <br />

                    <h6>Description:</h6>

                    <div style={{maxWidth: '300px'}}>{projectInfo.description}</div>

                </div>
                
            </div>

        </div>

    );

};

const ViewProject = connect(mapCredentials, mapDispatch)(ViewProjectComponent);

export { ViewProject };