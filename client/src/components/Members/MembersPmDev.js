import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MemberList } from './MemberList';

const MembersPmDevComponent = props => {
    
    return (

        <div className="main-page-parent">
            
            <MemberList />

        </div>

    );

};

const MembersPmDev = connect(mapCredentials)(MembersPmDevComponent);

export { MembersPmDev };