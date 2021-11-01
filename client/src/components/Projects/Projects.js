import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { useHistory } from 'react-router-dom';

const ProjectsComponent = props => {
    
    let history = useHistory();

    const memberObj = props.teamInfo.members.find(elem => 
        
        elem.username === props.userInfo.username
        
    );

    if (memberObj.role === 'dev') {

        history.push('/projects-dev');

    } else {

        history.push('/projects-admin-pm');

    }

    return null;

};

const Projects = connect(mapCredentials)(ProjectsComponent);

export { Projects };