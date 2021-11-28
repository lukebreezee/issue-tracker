import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MemberList } from './MemberList';
import { useHistory } from 'react-router-dom';

const MembersPmDevComponent = props => {

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

        <div className="main-page-parent">
            
            <MemberList />

        </div>

    );

};

const MembersPmDev = connect(mapCredentials)(MembersPmDevComponent);

export { MembersPmDev };