import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';

const MyTicketsComponent = props => {

    let history = useHistory();

    const userTickets = props.teamInfo.tickets.filter(obj => {

        const members = [...obj.ticketMembers];

        if (members.indexOf(props.userInfo.username) !== -1) {

            return true;

        } else if (obj.creator === props.userInfo.username) {

            return true;

        }

        return false;

    });

    const handleClick = (projectName, ticketName) => {

        props.currentProjectUpdate(projectName);

        props.currentTicketUpdate(ticketName);

        history.push('/view-ticket');

    };
    
    return (

        <div>

            <h3>My Tickets</h3>

            <div className="ticket-list-headers">

                <div className="scrolling-list-div-left"><u>Name</u></div>

                <div><u>Project</u></div>

                <div><u>Priority</u></div>

                <div><u>Status</u></div>

                <div><u>Date</u></div>

            </div>

            <div className="scrolling-list-medium">
            
                {

                    userTickets.map((obj, index) => {           

                        return (

                            <div

                                key={index}
                                onClick={() => handleClick(obj.projectName, obj.ticketName)}
                                className="ticket-list-div"
                                
                            >

                                <div className="scrolling-list-div-left">{obj.ticketName}</div> 
                                
                                <div>{obj.projectName}</div>

                                <div>{obj.priority}</div>

                                <div>{obj.status}</div>

                                <div className="scrolling-list-div-right">
                                    
                                    {obj.date.slice(4, 15)}
                                    
                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

const MyTickets = connect(mapCredentials, mapDispatch)(MyTicketsComponent);

export { MyTickets };