import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { useHistory } from 'react-router-dom';

const MembersComponent = props => {

    let history = useHistory();

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'admin') {

        history.push('/members-admin');

    } else {

        history.push('/members-pm-dev');

    }

    return null;

};

const Members = connect(mapCredentials)(MembersComponent);

export { Members };