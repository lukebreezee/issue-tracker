import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyProjects } from './MyProjects';

const ProjectsDevComponent = props => {
    
    return (

        <div className="main-page-parent">

            <MyProjects role="dev" />

        </div>

    );

};

const ProjectsDev = connect(mapCredentials)(ProjectsDevComponent);

export { ProjectsDev };