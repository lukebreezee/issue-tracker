import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';
import { useHistory } from 'react-router-dom';

const DashboardComponent = props => {
    
    let history = useHistory();

    history.push('/projects-admin-pm');

    return null;

};

const Dashboard = connect(mapCredentials)(DashboardComponent);

export { Dashboard };