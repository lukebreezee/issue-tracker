import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';

const AllTicketsComponent = props => {
    
    return (

        <div>

            <div>All Tickets</div>

            <div className="scrolling-list">
            
                {

                    props.teamInfo.tickets.map((obj, index) => {                        

                        return (

                            <div key={index}>

                                {obj.ticketName} {obj.projectName} {obj.ticketMembers.length}

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

const AllTickets = connect(mapCredentials)(AllTicketsComponent);

export { AllTickets };