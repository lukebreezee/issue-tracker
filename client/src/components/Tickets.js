import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const TicketsComponent = props => {

    let history = useHistory();

    useEffect(() => {
        
        if (!props.userInfo.username) {

            history.push('/login');

        } else if (!props.userInfo.teamUsername) {

            history.push('/team-login')

        }

    }, [history, props]);
    
    return (

        <div className="aligned">Tickets</div>

    );

};

const Tickets = connect(mapCredentials)(TicketsComponent);

export { Tickets };