import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';

const ViewProjectComponent = props => {

    let history = useHistory();

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

                <button onClick={() => history.push('/new-ticket')}>
                    
                    New Ticket
                    
                </button>

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

        <div className="main-page-parent">

            <div>
            
                <div>Details:</div>

                <div>Name: {projectInfo.projectName}</div>

                <div>Date Created: {projectInfo.date}</div>

                <div> 
                    
                    Creator: {creatorInfo.firstName} {creatorInfo.lastName} ({creatorInfo.role})
                    
                </div>

                <div>Priority: {projectInfo.priority}</div>

                <br />

                <div>Description: {projectInfo.description}</div>

                <br />

                <div>Teammates On Project:</div>

                <div className="scrolling-list">

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

                <div>Tickets For This Project:</div>

                <div className="scrolling-list">

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

                

                {

                    newTicket

                }

            </div>
            
        </div>

    );

};

const ViewProject = connect(mapCredentials, mapDispatch)(ViewProjectComponent);

export { ViewProject };