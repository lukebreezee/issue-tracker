import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const AccountComponent = props => {

    let history = useHistory();

    useEffect(() => {
        
        if (!props.userInfo.username) {

            history.push('/login');

        } else if (!props.userInfo.teamUsername) {

            history.push('/team-login')

        }

    }, [history, props]);
    
    return (

        <div className="aligned">Account</div>

    );

};

const Account = connect(mapCredentials)(AccountComponent);

export { Account };