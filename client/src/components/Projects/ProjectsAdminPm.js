import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { MyProjects } from './MyProjects';
import { useHistory } from 'react-router-dom';

const ProjectsAdminPmComponent = props => {

    let history = useHistory();

    if (!props.userInfo.username) {

        history.push('/login');
        return null;

    }

    if (!props.userInfo.teamUsername) {

        history.push('/team-login');
        return null;

    }

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'dev') {

        history.push('/projects-dev');

    }
    
    return (

        <div className="main-page-parent">

            <MyProjects role="admin-pm" />

        </div>

    );

};

const ProjectsAdminPm = connect(mapCredentials)(ProjectsAdminPmComponent);

export { ProjectsAdminPm };