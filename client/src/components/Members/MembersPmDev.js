import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MemberList } from './MemberList';

const MembersPmDevComponent = props => {
    
    return (

        <div className="aligned">
            
            <MemberList />

        </div>

    );

};

const MembersPmDev = connect(mapCredentials)(MembersPmDevComponent);

export { MembersPmDev };