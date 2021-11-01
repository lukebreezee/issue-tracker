import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { AssignRoles } from './AssignRoles';
import { MemberList } from './MemberList';

const MembersAdminComponent = props => {
    
    return (

        <div className="aligned">
            
            <AssignRoles />
            <MemberList />

        </div>

    );

};

const MembersAdmin = connect(mapCredentials)(MembersAdminComponent);

export { MembersAdmin };