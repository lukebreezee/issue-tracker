import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { AssignRoles } from './AssignRoles';
import { MemberList } from './MemberList';
import { useHistory } from 'react-router-dom';

const MembersAdminComponent = props => {

    let history = useHistory();

    console.log(props.teamInfo);

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

    if (memberObj.role !== 'admin') {

        history.push('/members-pm-dev');

    }
    
    return (


        <div className="main-page-parent" id="members-admin-parent">

            <AssignRoles />

            <MemberList />

        </div>

    );

};

const MembersAdmin = connect(mapCredentials)(MembersAdminComponent);

export { MembersAdmin };