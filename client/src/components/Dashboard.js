import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const DashboardComponent = props => {
    
    return (

        <div className="aligned">

            <div>Dashboard</div>

        </div>

    );

};

const Dashboard = connect(mapCredentials)(DashboardComponent);

export { Dashboard };