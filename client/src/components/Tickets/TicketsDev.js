import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyTickets } from './MyTickets';

const TicketsDevComponent = props => {
    
    return (

        <div className="aligned">

            <MyTickets />

        </div>

    );

};

const TicketsDev = connect(mapCredentials)(TicketsDevComponent);

export { TicketsDev };