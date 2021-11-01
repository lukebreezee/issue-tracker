import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { useHistory } from 'react-router-dom';

const TicketsComponent = props => {
    
    let history = useHistory();

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'dev') {

        history.push('/tickets-dev');

    } else {

        history.push('/tickets-admin-pm');

    }

    return null;

};

const Tickets = connect(mapCredentials)(TicketsComponent);

export { Tickets };