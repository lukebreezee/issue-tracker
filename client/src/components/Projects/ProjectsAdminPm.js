import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyProjects } from './MyProjects';

const ProjectsAdminPmComponent = props => {
    
    return (

        <div className="aligned">

            <MyProjects />

            <button>Create New Project</button>

        </div>

    );

};

const ProjectsAdminPm = connect(mapCredentials)(ProjectsAdminPmComponent);

export { ProjectsAdminPm };