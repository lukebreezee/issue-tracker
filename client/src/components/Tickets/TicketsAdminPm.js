import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyTickets } from './MyTickets';
import { AllTickets } from './AllTickets';

const TicketsAdminPmComponent = props => {
    
    return (

        <div className="aligned">

            <MyTickets />
            
            <AllTickets />

        </div>

    );

};

const TicketsAdminPm = connect(mapCredentials)(TicketsAdminPmComponent);

export { TicketsAdminPm };