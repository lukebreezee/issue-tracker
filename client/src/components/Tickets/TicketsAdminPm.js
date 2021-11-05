import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyTickets } from './MyTickets';
import { AllTickets } from './AllTickets';
import { useHistory } from 'react-router-dom';

const TicketsAdminPmComponent = props => {

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'dev') {

        history.push('/tickets-dev');

    }
    
    return (

        <div className="aligned">

            <MyTickets />
            
            <AllTickets />

        </div>

    );

};

const TicketsAdminPm = connect(mapCredentials)(TicketsAdminPmComponent);

export { TicketsAdminPm };