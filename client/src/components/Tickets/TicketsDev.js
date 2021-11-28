import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyTickets } from './MyTickets';
import { useHistory } from 'react-router-dom';

const TicketsDevComponent = props => {

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }
    
    return (

        <div className="aligned">

            <MyTickets />

        </div>

    );

};

const TicketsDev = connect(mapCredentials)(TicketsDevComponent);

export { TicketsDev };