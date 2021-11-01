import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const NotifsComponent = () => {
    
    return (

        <div className="aligned">Notifs</div>

    );

};

const Notifs = connect(mapCredentials)(NotifsComponent);

export { Notifs };