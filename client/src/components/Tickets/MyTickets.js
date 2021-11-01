import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';

const MyTicketsComponent = props => {

    const userTickets = props.teamInfo.tickets.filter(obj => {

        const members = [...obj.members];

        if (members.indexOf(props.userInfo.username) !== -1) {

            return true;

        }

        return false;

    });
    
    return (

        <div>

            <div>My Tickets</div>

            <div className="scrolling-list">
            
                {

                    userTickets.map(obj => {           

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

const MyTickets = connect(mapCredentials)(MyTicketsComponent);

export { MyTickets };