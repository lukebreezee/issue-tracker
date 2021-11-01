import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';

const AllTicketsComponent = props => {
    
    return (

        <div>

            <div>All Tickets</div>

            <div className="scrolling-list">
            
                {

                    props.teamInfo.tickets.map(obj => {                        

                        return (

                            <div>

                                {obj.name} {obj.project} {obj.members.length}

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