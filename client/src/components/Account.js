import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const AccountComponent = props => {

    return (

        <div className="aligned">Account</div>

    );

};

const Account = connect(mapCredentials)(AccountComponent);

export { Account };