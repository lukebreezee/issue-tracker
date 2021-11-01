import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const DashboardComponent = props => {
    
    return (

        <div className="aligned">Dashboard</div>

    );

};

const Dashboard = connect(mapCredentials)(DashboardComponent);

export { Dashboard };