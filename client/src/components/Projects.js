import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';

const ProjectsComponent = props => {

    let history = useHistory();

    useEffect(() => {
        
        if (!props.userInfo.username) {

            history.push('/login');

        } else if (!props.userInfo.teamUsername) {

            history.push('/team-login')

        }

    }, [history, props]);
    
    return (

        <div className="aligned">Projects</div>

    );

};

const Projects = connect(mapCredentials)(ProjectsComponent);

export { Projects };