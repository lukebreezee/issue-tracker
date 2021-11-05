import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials } from '../../redux/mapToProps';

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

    return (

        <div className="aligned">
            
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

            <div>Tickets For This Project:</div>

            <div className="scrolling-list">

                {

                    props.teamInfo.tickets.map((obj, index) => {

                        if (obj.projectName === projectInfo.projectName) {

                            return <div key={index}>{obj.ticketName}</div>

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

    );

};

const ViewProject = connect(mapCredentials)(ViewProjectComponent);

export { ViewProject };