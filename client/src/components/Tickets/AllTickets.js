import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';

const AllTicketsComponent = props => {

    let history = useHistory();

    const handleClick = (projectName, ticketName) => {

        props.currentProjectUpdate(projectName);

        props.currentTicketUpdate(ticketName);

        history.push('/view-ticket');

    };
    
    return (

        <div>

            <h3>All Tickets</h3>

            <div className="ticket-list-headers">

                <div className="scrolling-list-div-left"><u>Name</u></div>

                <div><u>Project</u></div>

                <div><u>Priority</u></div>

                <div><u>Status</u></div>

                <div><u>Date</u></div>

            </div>

            <div className="scrolling-list-medium">
            
                {

                    props.teamInfo.tickets.map((obj, index) => {                        

                        return (

                            <div

                                key={index}
                                onClick={() => handleClick(obj.projectName, obj.ticketName)}
                                className="ticket-list-div"
                                
                            >

                                <div>{obj.ticketName}</div>

                                <div>{obj.projectName}</div>

                                <div>{obj.priority}</div>

                                <div>{obj.status}</div>

                                <div>{obj.date.slice(4, 15)}</div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

const AllTickets = connect(mapCredentials, mapDispatch)(AllTicketsComponent);

export { AllTickets };