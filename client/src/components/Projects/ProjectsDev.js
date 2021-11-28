import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyProjects } from './MyProjects';
import { useHistory } from 'react-router-dom';

const ProjectsDevComponent = props => {

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }
    
    return (

        <div className="main-page-parent">

            <MyProjects role="dev" />

        </div>

    );

};

const ProjectsDev = connect(mapCredentials)(ProjectsDevComponent);

export { ProjectsDev };